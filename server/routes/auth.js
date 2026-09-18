const express = require("express");
const bcrypt = require("bcryptjs");

const Users = require("../models/User");

const router = express.Router();

router.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({
        message: "Username, email and password are required.",
      });
    }

    const existingUser = await User.findOne({
      $or: [{ username }, { email }],
    });

    if (existingUser) {
      return res.status(409).json({
        message: "Username or email already exists.",
      });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      passwordHash,
    });

    res.status(201).json({
      message: "Account created successfully.",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Signup failed:", error.message);

    res.status(500).json({
      message: "Something went wrong.",
    });
  }
});

module.exports = router;