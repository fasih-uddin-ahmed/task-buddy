var { mongoose } = require("../config/db/mongoose");
//const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create Schema
const BoardSchema = new Schema({
  title: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 50
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users"
  },
  members: [
    {
      userID: {
        type: String
      },
      avatar: {
        type: String
      },
      name: {
        type: String
      }
    }
  ],
  lists: [
    {
      title: {
        type: String,
        required: true
      },
      user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
      },
      cards: [
        {
          text: {
            type: String,
            required: true
          },
          members: {
            type: Array
          },

          user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users"
          },
          date: {
            type: Date,
            default: Date.now
          },
          description: {
            type: String
          },
          lastDate: {
            type: Date
          }
        }
      ],
      date: {
        type: Date,
        default: Date.now
      }
    }
  ],

  date: {
    type: Date,
    default: Date.now
  },
  description: {
    type: String
  }
});

module.exports = Board = mongoose.model("boards", BoardSchema);
