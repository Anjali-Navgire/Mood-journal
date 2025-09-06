const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const authMiddleware = require("../middlewares/authMiddleware");

router.get("/profile", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Profile error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
