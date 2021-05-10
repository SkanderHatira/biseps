const express = require("express");
const path = require("path");
const router = express.Router();
const createProfile = require("../../helpers/createProfile");
const createConfig = require("../../helpers/createConfig");
const createUnits = require("../../helpers/createUnits");
const spawnChild = require("../../snakemake");
const fs = require("fs");

// Load input validation
const validateConfigurationInput = require("../../validation/sampleConfiguration");
// Load Run model

const Run = require("../../models/Run");
const User = require("../../models/User");
const { ObjectId } = require("bson");

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
            samples: req.body.samples,
            units: req.body.units,
            createdBy: req.body.userId,
        });
        newRun
            .save()
            .then((run) => {
                res.json(run);
                User.findByIdAndUpdate(
                    run.createdBy,
                    { $push: { runs: run._id } },
                    { safe: true, upsert: true, new: true },
                    function (err, model) {
                        console.log(err);
                    }
                );
            })
            .catch((err) => console.log(err));

        console.log("POST method");
        createProfile(req.body, uniqueDir);
        createConfig(req.body, uniqueDir);
        createUnits(req.body, uniqueDir);
        spawnChild(req.body, profile);
    }
});
router.delete("/:id", function (req, res) {
    const id = req.params.id;
    const userId = req.user._id;
    console.log(req.outdir);
    console.log(req.user);
    Run.deleteOne({ _id: id })
        .then((result) => {
            res.json(`Deleted ${id}`);
        })
        .catch((error) => console.error(error));
    User.findByIdAndUpdate(
        userId,
        { $pull: { runs: id } },
        { safe: true, upsert: true, new: true },
        function (err, model) {
            console.log(err);
        }
    );
});
router.get("/", function (req, res) {
    Run.find({}, function (err, runs) {
        if (err)
            return res
                .status(500)
                .send("There was a problem finding the runs.");
        res.status(200).send(runs);
    }).populate("createdBy");
    console.log("GET method");
});

router.get("/:id", function (req, res) {
    Run.findById(req.params.id, function (err, unit) {
        if (err)
            return res
                .status(500)
                .send("There was a problem finding the users.");
        res.status(200).send(unit);
    }).populate("createdBy");
});
router.post("/rerun", function (req, res) {
    const profile = path.join(req.body.path, "config/profile");
    spawnChild(profile);
    console.log("Rerun Snakemake", profile);
});
module.exports = router;
