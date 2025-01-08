const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload");
const replicaController = require("../controllers/replicaController");

// POST - Create a new replica with image upload
router.post("/", express.json(), replicaController.createReplica);

// GET - Retrieve all replicasnodemon
router.get("/", replicaController.getAllReplicas);

// GET by ID - Retrieve a specific replica
router.get("/:id", replicaController.getReplicaById);

// PUT - Update a replica with a new image
//router.put("/:id", upload.single("image"), replicaController.updateReplica);

// DELETE - Remove a specific replica
router.delete("/:id", replicaController.deleteReplica);

module.exports = router;
