const express = require("express");
const mongoose = require("mongoose");
const userRoute = require("./routes/user");
const messengerRoute = require("./routes/messenger");
const cookieParser = require("cookie-parser");
const db = require("./config/db");

require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 8000;

db.connectionDB();
app.use(express.json());
app.use(cookieParser());
app.use("/auth", userRoute);
app.use("/messenger", messengerRoute);
app.use("/portfolio", userRoute);
app.use("/projects", userRoute);

mongoose.connection.once("open", () => {
  console.log("Connected to the MongoDB");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
