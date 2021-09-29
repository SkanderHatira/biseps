const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateConfigurationInput(data) {
    let errors = {};
  // Convert empty fields to an empty string so we can use validator functions
    data.aligner = !isEmpty(data.aligner) ? data.aligner : "";


// aligner checks
if (Validator.isEmpty(data.aligner)) {
    errors.aligner = "aligner field is required";
}
  return {
      errors,
      isValid: isEmpty(errors)
    };
  };