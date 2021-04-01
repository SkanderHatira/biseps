const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateVisualizeInput(data) {
    let errors = {};
    // Convert empty fields to an empty string so we can use validator functions
    data.genomes = !isEmpty(data.genomes) ? data.genomes : "";

    // outdir checks
    if (Validator.isEmpty(data.genomes)) {
        errors.genomes = "genomes field is required";
    }

    return {
        errors,
        isValid: isEmpty(errors),
    };
};
