const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");
var { mongoose } = require("./config/db/mongoose");
const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const posts = require("./routes/api/posts");
const boards = require("./routes/api/boards");
const cardModal = require("./routes/api/cardModal");
const uploadImages = require("./routes/api/uploadImages");
var cors = require('cors');


const app = express();
app.use(cors());
//Body Parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//DB Config
//const db = require("./config/db/mongoose").mongoURI;

//connect to MongoDB if using atlas
// mongoose
//   .connect(db, { useFindAndModify: false })
//   .then(() => {
//     console.log("MongoDB Connected");
//   })
//   .catch(err => {
//     console.log(err);
//   });

//passport middleware
app.use(passport.initialize());

//passport config
require("./config/passport")(passport);

// Use Routes
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);
app.use("/api/boards", boards);
app.use("/api/cardModal", cardModal);
app.use("/api/uploadImages", uploadImages);

const port = process.env.port || 5000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
