const express = require("express");
const Replica = require("../models/ReplicaSchema.jsx"); // Import the Replica model
const router = express.Router();

// POST: Create a new replica
router.post("/createnewreplica", async (req, res) => {
  try {
    const { name, age, email, description } = req.body;

    // Validate input
    if (!name || !age || !email || !description) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Create a new replica
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

module.exports = router; // Export the router
