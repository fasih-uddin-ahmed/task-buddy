const express = require("express");
const router = express.Router();
const multer = require("multer");

const path = "E:\mywebwork\my coding work\taskbuddy\images"
// "D:/Final Year Project/Front End/PatientEnd/public/images/patientimages"
//"E:/mywebwork/my coding work/taskbuddy/client/public/images";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path);
  },
  filename: function (req, file, cb) {
    // cb(null, Date.now() + "-" + file.originalname);
    cb(null, file.originalname);
  }
});
const imageFileFilter = (req, file, cb) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
    return cb(new Error("You can upload only image file!"), false);
  }
  cb(null, true);
};
const upload = multer({ storage, fileFilter: imageFileFilter });
router.post("/", upload.single("file"), async (req, res, err) => {
  image = `/images/${req.file.filename}`;
  console.log(image);
  res.status(200).send(image);

});

module.exports = router;
