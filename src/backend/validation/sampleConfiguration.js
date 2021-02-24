const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateConfigurationInput(data) {
    let errors = {};
  // Convert empty fields to an empty string so we can use validator functions
    data.sampleFile = !isEmpty(data.sampleFile) ? data.sampleFile : "";
    data.unitsFile = !isEmpty(data.unitsFile) ? data.unitsFile : "";
    data.outdir = !isEmpty(data.outdir) ? data.outdir : "";
    data.genome = !isEmpty(data.genome) ? data.genome : "";
    data.adapters = !isEmpty(data.adapters) ? data.adapters : "";
    data.subsample = !isEmpty(data.subsample) ? data.subsample : "";
    data.trimming = !isEmpty(data.trimming) ? data.trimming : "";
    data.quality = !isEmpty(data.quality) ? data.quality : "";
    data.genome_preparation = !isEmpty(data.genome_preparation) ? data.genome_preparation : "";
    data.methylation_extraction_bismark = !isEmpty(data.methylation_extraction_bismark) ? data.methylation_extraction_bismark : "";
    data.methylation_calling = !isEmpty(data.methylation_calling) ? data.methylation_calling : "";

// sampleFile checks
if (Validator.isEmpty(data.sampleFile)) {
    errors.sampleFile = "sampleFile field is required";
}
// unitsFile checks
if (Validator.isEmpty(data.unitsFile)) {
    errors.unitsFile = "unitsFile field is required";
}
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
// subsample checks
if (Validator.isEmpty(data.subsample)) {
    errors.subsample = "subsample field is required";
}  
// trimming checks
if (Validator.isEmpty(data.trimming)) {
    errors.trimming = "trimming field is required";
}  
// quality checks
if (Validator.isEmpty(data.quality)) {
    errors.quality = "quality field is required";
}  
// genome_preparation checks
if (Validator.isEmpty(data.genome_preparation)) {
    errors.genome_preparation = "genome_preparation field is required";
}  
// methylation_extraction_bismark checks
if (Validator.isEmpty(data.methylation_extraction_bismark)) {
    errors.methylation_extraction_bismark = "methylation_extraction_bismark field is required";
}  
// methylation_calling checks
if (Validator.isEmpty(data.methylation_calling)) {
    errors.methylation_calling = "methylation_calling field is required";
}   

  return {
      errors,
      isValid: isEmpty(errors)
    };
  };