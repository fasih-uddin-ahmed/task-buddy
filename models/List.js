var { mongoose } = require("../config/db/mongoose");
//const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create Schema
const ListSchema = new Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users"
  },

  board_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "boards"
  },

  title: {
    type: String,
    required: true
  },
  cards: [
    {
      text: {
        type: String,
        required: true
      },

      user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = List = mongoose.model("lists", ListSchema);
