const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PortfolioSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  demo: {
    type: String,
    required: true,
  },
  urlImg: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Portfolio = mongoose.model("Portfolio", PortfolioSchema);

module.exports = Portfolio;
