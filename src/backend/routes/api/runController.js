const express = require("express");
const path = require("path");
const router = express.Router();
const createProfile = require("../../helpers/createProfile");
const createConfig = require("../../helpers/createConfig");
const createUnits = require("../../helpers/createUnits");
const spawnChild = require("../../snakemake");
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
const { runInNewContext } = require("vm");

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
        const uniqueDir = path.join(req.body.outdir, new Date().toISOString());
        const profile = path.join(uniqueDir, "config/profile");
        const newRun = new Run({
            outdir: uniqueDir,
            profile: profile,
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
        createProfile(req.body, uniqueDir);
        createConfig(req.body, uniqueDir);
        createUnits(req.body, uniqueDir);
        spawnChild(profile);
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

router.get("/run/:id", function (req, res) {
    Run.findById(req.params.id, function (err, unit) {
        if (err)
            return res
                .status(500)
                .send("There was a problem finding the users.");
        res.status(200).send(unit);
    });
});
module.exports = router;
