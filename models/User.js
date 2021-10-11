var { mongoose } = require("../config/db/mongoose");
//const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  },
  team: {
    type: String
  },
  sendReq: [
    {
      email: {
        type: String
      },
      status: {
        type: String
      },
      avatar: {
        type: String
      }
    }
  ],
  receiveReq: [
    {
      email: {
        type: String
      },
      status: {
        type: String
      },
      team: {
        type: String
      },
      avatar: {
        type: String
      },
      hidden: false
    }
  ],
  notification: [
    {
      boardName: {
        type: String
      },
      userName: {
        type: String
      }
    }
  ]
});

module.exports = User = mongoose.model("users", UserSchema);
