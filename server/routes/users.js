const express = require("express");

const User = require("../models/User");
const authenticate = require("../middleware/auth");

const router = express.Router();

router.put("/me", authenticate, async (req, res) => {
  try {
    const { username, bio, instagram } = req.body;

    if (!username || username.trim().length < 3) {
      return res.status(400).json({
        message: "Username must be at least 3 characters.",
      });
    }

    const existingUser = await User.findOne({
      username: username.trim(),
      _id: { $ne: req.userId },
    });

    if (existingUser) {
      return res.status(409).json({
        message: "Username is already taken.",
      });
    }

    const user = await User.findByIdAndUpdate(
      req.userId,
      {
        username: username.trim(),
        bio: bio?.trim() || "",
        instagram: instagram?.trim() || "",
      },
      {
        new: true,
        runValidators: true,
      }
    ).select("-passwordHash");

    res.json({
      message: "Profile updated.",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        bio: user.bio,
        instagram: user.instagram,
      },
    });
  } catch (error) {
    console.error("Profile update failed:", error.message);

    res.status(500).json({
      message: "Unable to update profile.",
    });
  }
});

module.exports = router;