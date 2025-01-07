// models/ReplicaSchema.jsx
const mongoose = require("mongoose");

const ReplicaSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  email: { type: String, required: true, unique: true },
  description: { type: String, required: true },
});

const Replica = mongoose.model("Replica", ReplicaSchema);

module.exports = Replica;
