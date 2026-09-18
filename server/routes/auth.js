const authenticate = require("../middleware/auth");
const jwt = require("jsonwebtoken");
const express = require("express");
const bcrypt = require("bcryptjs");

const User = require("../models/User");

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

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required.",
      });
    }

    const user = await User.findOne({
      email: email.toLowerCase(),
    });

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password.",
      });
    }

    const passwordMatches = await bcrypt.compare(
      password,
      user.passwordHash
    );

    if (!passwordMatches) {
      return res.status(401).json({
        message: "Invalid email or password.",
      });
    }

    const token = jwt.sign(
  {
    userId: user._id.toString(),
  },
  process.env.JWT_SECRET,
  {
    expiresIn: "7d",
  }
);

res.cookie("token", token, {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
  maxAge: 7 * 24 * 60 * 60 * 1000,
});

res.json({
  message: "Login successful.",
  user: {
    id: user._id,
    username: user.username,
    email: user.email,
  },
});
  } catch (error) {
    console.error("Login failed:", error.message);

    res.status(500).json({
      message: "Something went wrong.",
    });
  }
});

router.get("/me", authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select(
      "-passwordHash"
    );

    if (!user) {
      return res.status(404).json({
        message: "User not found.",
      });
    }

    res.json({
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        bio: user.bio,
        instagram: user.instagram,
      },
    });
  } catch (error) {
    console.error("Fetching current user failed:", error.message);

    res.status(500).json({
      message: "Something went wrong.",
    });
  }
});

module.exports = router;