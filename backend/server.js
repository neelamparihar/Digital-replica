const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const cloudinary = require("cloudinary").v2;
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json({ limit: "10mb" }));

// MongoDB connection
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Mongoose schema
const ReplicaSchema = new mongoose.Schema({
  name: String,
  age: Number,
  email: String,
  description: String,
});

const Replica = mongoose.model("Replica", ReplicaSchema);

// API endpoint to create a replica
app.post("/api/create-replica", async (req, res) => {
  try {
    const { name, age, email, description } = req.body;

    if (!name || !age || !email || !description) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newReplica = new Replica({
      name,
      age,
      email,
      description,
    });

    await newReplica.save();
    res.status(200).json({ message: "Replica created successfully!" });
  } catch (error) {
    console.error("Error creating replica:", error);
    res.status(500).json({ message: "Server error", error });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
