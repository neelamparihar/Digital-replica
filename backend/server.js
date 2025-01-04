const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

// Load environment variables from .env file
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Atlas connection string from .env file
const dbURI = process.env.MONGODB_URI;

// Connect to MongoDB Atlas
mongoose
  .connect(dbURI)
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((err) => console.log("MongoDB connection error:", err));

// Your routes here
app.post("/api/create-replica", (req, res) => {
  const { name, age, email, description } = req.body;

  // Replica schema and model should be defined here
  const Replica = mongoose.model("Replica", {
    name: String,
    age: Number,
    email: String,
    description: String,
  });

  const newReplica = new Replica({ name, age, email, description });

  newReplica
    .save()
    .then(() => res.json({ message: "Replica created successfully!" }))
    .catch((err) =>
      res.status(500).json({ message: "Error saving replica", error: err })
    );
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
