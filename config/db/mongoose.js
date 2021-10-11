var mongoose = require("mongoose");

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/taskbuddy");
module.exports = {
  //    mongoose: mongoose
  mongoose
};
