const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateCardInput(data) {
  let errors = {};

  data.text = !isEmpty(data.text) ? data.text : "";

  if (!Validator.isLength(data.text, { min: 2, max: 255 })) {
    errors.text = "Text of Card must be between 2 and 255 characters";
  }

  if (Validator.isEmpty(data.text)) {
    errors.text = "Text field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
