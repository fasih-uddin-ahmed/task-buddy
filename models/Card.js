var { mongoose } = require("../config/db/mongoose");
//const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create Schema
const CardSchema = new Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users"
  },
  list_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "lists"
  },
  text: {
    type: String,
    required: true
  },
  Description: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Card = mongoose.model("cards", CardSchema);
