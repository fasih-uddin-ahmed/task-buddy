var { mongoose } = require("../config/db/mongoose");
//const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create Schema
const ModalSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  card_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "cards"
  },
  dueDate: {
    type: String
  },
  description: {
    type: String
  },
  members: [
    {
      email: {
        type: String
      },
      user_id: {
        type: Schema.Types.ObjectId,
        ref: "users"
      }

    }
  ],
  checklist: [
    {
      name: {
        type: String
      },
      status: {
        type: Boolean
      }
    }
  ],
  comments: [
    {
      user_id: {
        type: Schema.Types.ObjectId,
        ref: "users"
      },
      text: {
        type: String,
        required: true
      },
      name: {
        type: String
      },
      avatar: {
        type: String
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ]
});

module.exports = Modal = mongoose.model("modals", ModalSchema);
