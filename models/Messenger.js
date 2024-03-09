const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const MessengerSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Messenger = mongoose.model("Messenger", MessengerSchema);

module.exports = Messenger;
