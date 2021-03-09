const express = require("express");
const router = express.Router();
const createProfile = require("../../helpers/createProfile");
const createConfig = require("../../helpers/createConfig");
const createUnits = require("../../helpers/createUnits");

// load launch script
// const launchRun = () => {
//     require("../../snakemake.js");
// };
// const createProfile = () => {
//     require("../../helpers/createProfile");
// };
// console.log(createProfile);
// const createConfig = () => {
//     require("../../helpers/createConfig");
// };
// Load input validation
const validateConfigurationInput = require("../../validation/sampleConfiguration");
// Load Run model

const Run = require("../../models/Run");

// @route POST api/runs/Run
// @desc Run
// @access Public
router.post("/run", (req, res) => {
    console.log(req.body);
    // Form validation
    const { errors, isValid } = validateConfigurationInput(req.body);
    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    } else {
        const newRun = new Run({
            outdir: req.body.outdir,
            genome: req.body.genome,
            adapters: req.body.adapters,
            steps: {
                subsample: req.body.subsample,
            },
            samples: req.body.sampleState,
        });
        newRun
            .save()
            .then((run) => res.json(run))
            .catch((err) => console.log(err));
        // launchRun();
        console.log("POST method");
        // console.log(newRun.samples[0].units[0].r1);
        // createProfile(req.body);
        // createConfig(req.body);
        createUnits(req.body);
    }
});
router.get("/run", function (req, res) {
    Run.find({}, function (err, runs) {
        if (err)
            return res
                .status(500)
                .send("There was a problem finding the runs.");
        res.status(200).send(runs);
    });
    console.log("GET method");
});

module.exports = router;
