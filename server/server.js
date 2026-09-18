const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/auth");
const express = require("express");
const mongoose = require("mongoose");
const dns = require("dns");

require("dotenv").config();

dns.setServers(["8.8.8.8"]);

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);

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