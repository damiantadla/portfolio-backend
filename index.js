const express = require("express");
const mongoose = require("mongoose");
const userRoute = require("./routes/user");
const projectRoute = require("./routes/projects");
const messengerRoute = require("./routes/messenger");
const portfolioRoute = require("./routes/portfolio");
const cookieParser = require("cookie-parser");
const db = require("./config/db");
const path = require("path");
require("dotenv").config();

const app = express();
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
const PORT = process.env.PORT || 8000;

db.connectionDB();
app.use(express.json());
app.use(cookieParser());
app.use("/auth", userRoute);
app.use("/messenger", messengerRoute);
app.use("/portfolio", portfolioRoute);
app.use("/projects", projectRoute);

mongoose.connection.once("open", () => {
  console.log("Connected to the MongoDB");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
