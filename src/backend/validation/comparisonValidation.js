const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateConfigurationInput(data) {
    let errors = {};
    // Convert empty fields to an empty string so we can use validator functions
    data.outdir = !isEmpty(data.outdir) ? data.outdir : "";

    // outdir checks
    if (Validator.isEmpty(data.outdir)) {
        errors.outdir = "outdir field is required";
    }

    return {
        errors,
        isValid: isEmpty(errors),
    };
};
