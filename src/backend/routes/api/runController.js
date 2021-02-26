const express = require("express");
const router = express.Router();
// load launch script
const launchRun = () => {
    require("../../snakemake");
};
// Load input validation
const validateConfigurationInput = require("../../validation/sampleConfiguration");
// Load Run model

const Run = require("../../models/Run");

// @route POST api/users/Run
// @desc Run user
// @access Public
router.post("/run", (req, res) => {
    // Form validation
    const { errors, isValid } = validateConfigurationInput(req.body);
    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    } else {
        const newRun = new Run({
            sampleFile: req.body.sampleFile,
            unitsFile: req.body.unitsFile,
            outdir: req.body.outdir,
            genome: req.body.genome,
            adapters: req.body.adapters,
            steps: {
                subsample: req.body.subsample,
                trimming: req.body.trimming,
                quality: req.body.quality,
                genome_preparation: req.body.genome_preparation,
                methylation_extraction_bismark:
                    req.body.methylation_extraction_bismark,
                methylation_calling: req.body.methylation_calling,
            },
        });
        newRun
            .save()
            .then((user) => res.json(user))
            .catch((err) => console.log(err));
    }
    console.log("POST method");
});
router.get("/run", function (req, res) {
    Run.find({}, function (err, users) {
        if (err)
            return res
                .status(500)
                .send("There was a problem finding the runs.");
        res.status(200).send(users);
    });
    console.log("GET method");
    launchRun();
});

module.exports = router;
