const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateConfigurationInput(data) {
    let errors = {};
    // Convert empty fields to an empty string so we can use validator functions
    data.outdir = !isEmpty(data.outdir) ? data.outdir : "";
    data.genome = !isEmpty(data.genome) ? data.genome : "";
    data.adapters = !isEmpty(data.adapters) ? data.adapters : "";

    // outdir checks
    if (Validator.isEmpty(data.outdir)) {
        errors.outdir = "outdir field is required";
    }
    // genome checks
    if (Validator.isEmpty(data.genome)) {
        errors.genome = "genome field is required";
    }
    // adapters checks
    if (Validator.isEmpty(data.adapters)) {
        errors.adapters = "adapters field is required";
    }

    return {
        errors,
        isValid: isEmpty(errors),
    };
};
