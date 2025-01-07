// server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const Replica = require("./models/ReplicaSchema.jsx"); // Changed import
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json({ limit: "10mb" }));

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((err) => console.error("MongoDB connection error:", err));

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

app.get("/api/fetch-replica", async (req, res) => {
  try {
    const data = await Replica.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
