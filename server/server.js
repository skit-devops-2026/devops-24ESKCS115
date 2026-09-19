const cookieParser = require("cookie-parser");
const cors = require("cors");
const dns = require("dns");
const express = require("express");
const mongoose = require("mongoose");

require("dotenv").config();

dns.setServers(["8.8.8.8"]);

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/users");

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.send("MR14 backend is running.");
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected.");

    app.listen(process.env.PORT, () => {
      console.log(`MR14 server running on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error.message);
  });