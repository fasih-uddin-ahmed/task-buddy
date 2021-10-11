const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateBoardInput(data) {
  let errors = {};

  data.title = !isEmpty(data.title) ? data.title : "";
  //data.description = !isEmpty(data.description) ? data.description : "";

  if (!Validator.isLength(data.title, { min: 2, max: 30 })) {
    errors.title = "Title of Board must be between 2 and 30 characters";
  }

  // if (!Validator.isLength(data.description, { min: 5, max: 255 })) {
  //   errors.description =
  //     "Description of Board must be between 5 and 255 characters";
  // }

  if (Validator.isEmpty(data.title)) {
    errors.title = "Title field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
