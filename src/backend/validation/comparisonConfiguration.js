const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateConfigurationInput(data) {
    let errors = {};
    // Convert empty fields to an empty string so we can use validator functions
    data.method = !isEmpty(data.method) ? data.method : "";
    data.stat = !isEmpty(data.stat) ? data.stat : "";
    // method checks
    if (Validator.isEmpty(data.method)) {
        errors.method = "method field is required";
    }
    // adapters checks
    if (Validator.isEmpty(data.stat)) {
        errors.stat = "stat field is required";
    }

    return {
        errors,
        isValid: isEmpty(errors),
    };
};
