const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const morgan = require("morgan");
const cors = require("cors");
const connectDB = require("./config/db");
const path = require("path");

// dot config
dotenv.config();

//mongodb connection
connectDB();

// express instance
const app = express();

//port
const PORT = process.env.PORT || 8080;

// middlewares

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// routes
app.use("/auth", require("./routes/authRoutes"));
app.use("/inventory", require("./routes/inventoryRoutes"));
app.use("/analytics", require("./routes/analyticsRoutes"));
app.use("/admin", require("./routes/adminRoutes"));

// Static folder
app.use(express.static(path.join(__dirname, "./client/build")));

// Static routes
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

//listen
app.listen(PORT, () =>
  console.log(
    `Node Server Running in ${process.env.DEV_MODE} Mode on Port ${PORT}`.bgBlue
      .white
  )
);
