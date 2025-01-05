const express = require("express");
const admin = require("../firebase");
const User = require("../models/User");

const router = express.Router();

// Verify Firebase Token Middleware
const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Unauthorized: No token provided" });
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken; // Attach user info to request
    next();
  } catch (err) {
    console.error("Token verification failed:", err);
    res.status(401).json({ error: "Unauthorized: Invalid token" });
  }
};

// Register or Login Route
router.post("/authenticate", async (req, res) => {
  const { token } = req.body;

  try {
    // Verify Firebase token
    const decodedToken = await admin.auth().verifyIdToken(token);
    const { uid, email, name } = decodedToken;

    // Check if user already exists in MongoDB
    let user = await User.findOne({ uid });

    if (!user) {
      // Create a new user
      user = new User({
        uid,
        name: name || "Unnamed User",
        email,
      });
      await user.save();
    }

    res.status(200).json({ message: "User authenticated", user });
  } catch (err) {
    console.error("Error during authentication:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
