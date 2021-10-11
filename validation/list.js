const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateListInput(data) {
  let errors = {};

  data.title = !isEmpty(data.title) ? data.title : "";

  if (!Validator.isLength(data.title, { min: 2, max: 255 })) {
    errors.title = "Title of List must be between 2 and 255 characters";
  }

  if (Validator.isEmpty(data.title)) {
    errors.title = "Title field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
