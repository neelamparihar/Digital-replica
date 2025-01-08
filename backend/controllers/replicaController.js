const Replica = require("../models/Replica");

// GET - Retrieve all replicas
exports.getAllReplicas = async (req, res) => {
  try {
    const replicas = await Replica.find();
    res.status(200).json(replicas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch replicas" });
  }
};

// GET by ID - Retrieve a single replica
exports.getReplicaById = async (req, res) => {
  try {
    const { id } = req.params;
    const replica = await Replica.findById(id);
    if (!replica) {
      return res.status(404).json({ error: "Replica not found" });
    }
    res.status(200).json(replica);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch replica" });
  }
};

// DELETE - Delete a replica
exports.deleteReplica = async (req, res) => {
  try {
    const { id } = req.params;

    // Find and delete the replica
    const deletedReplica = await Replica.findByIdAndDelete(id);

    if (!deletedReplica) {
      return res.status(404).json({ error: "Replica not found" });
    }

    res.status(200).json({
      message: "Replica deleted successfully",
      replica: deletedReplica,
    });
  } catch (error) {
    console.error("Error deleting replica:", error);
    res.status(500).json({ error: "Failed to delete replica" });
  }
};

// POST - Create a new replica
exports.createReplica = async (req, res) => {
  try {
    const { name, description, persona, tone } = req.body;

    // Save the replica in the database
    const replica = new Replica({
      name,
      description,
      persona,
      tone,
    });
    await replica.save();

    res.status(201).json({ message: "Replica created successfully", replica });
  } catch (error) {
    console.error("Error creating replica:", error);
    res.status(500).json({ error: "Failed to create replica" });
  }
};

// PUT - Update a replica
exports.updateReplica = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, persona, tone } = req.body;

    // Prepare the updated data
    const updateData = { name, description, persona, tone };

    // Update the replica in the database
    const replica = await Replica.findByIdAndUpdate(id, updateData, {
      new: true, // Return the updated document
      runValidators: true, // Validate the update against the schema
    });

    if (!replica) {
      return res.status(404).json({ error: "Replica not found" });
    }

    res.status(200).json({ message: "Replica updated successfully", replica });
  } catch (error) {
    console.error("Error updating replica:", error);
    res.status(500).json({ error: "Failed to update replica" });
  }
};
