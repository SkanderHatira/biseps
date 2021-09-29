const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateVisualizeInput(data) {
    let errors = {};
    // Convert empty fields to an empty string so we can use validator functions

    // outdir checks

    return {
        errors,
        isValid: isEmpty(errors),
    };
};
