const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateConfigurationInput(data) {
    let errors = {};
    // Convert empty fields to an empty string so we can use validator functions
    data.hostname = !isEmpty(data.hostname) ? data.hostname : "";
    data.username = !isEmpty(data.username) ? data.username : "";
    data.privateKey = !isEmpty(data.privateKey) ? data.privateKey : "";

    // hostname checks
    if (Validator.isEmpty(data.hostname)) {
        errors.hostname = "outdir field is required";
    }
    // username checks
    if (Validator.isEmpty(data.username)) {
        errors.username = "username field is required";
    }
    // privateKey checks
    if (Validator.isEmpty(data.privateKey)) {
        errors.privateKey = "privateKey field is required";
    }

    return {
        errors,
        isValid: isEmpty(errors),
    };
};
