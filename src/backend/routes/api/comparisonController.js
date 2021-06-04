const express = require("express");
const path = require("path");
const router = express.Router();
const createJB = require("../../helpers/createJbrowse");
const spawnJbrowse = require("../../helpers/spawnJbrowse");

// Load input validation
const validateConfigurationInput = require("../../validation/viewValidation");
// Load Run model

const Comparison = require("../../models/Comparison");
const User = require("../../models/User");

// @route POST api/runs/Run
// @desc Run
// @access Public
router.post("/comparison", (req, res) => {
    console.log(req.body);
});
router.post("/comparison", (req, res) => {
    console.log(req.body);
    // Form validation
    const { errors, isValid } = validateConfigurationInput(req.body);
    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    } else {
        if (!req.body.remote) {
            const uniqueDir = path.join(
                req.body.outdir,
                new Date().toISOString()
            );
            const profile = path.join(uniqueDir, "config/profiles/local");

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
        } else {
            const date = new Date().toISOString();
            const uniqueDir = path.join(req.body.outdir, date);
            const uniqueDirRemote = path.join(req.body.remoteOutdir, date);
            const profile = req.body.cluster
                ? path.join(uniqueDir, "config/profiles/slurm")
                : path.join(uniqueDir, "config/profiles/local");

            const newRun = new Run({
                outdir: uniqueDir,
                remoteOutdir: uniqueDirRemote,
                profile: profile,
                genome: req.body.genome,
                adapters: req.body.adapters,
                steps: {
                    subsample: req.body.subsample,
                },
                samples: req.body.samples,
                units: req.body.remoteunits,
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
            cloneBiseps(req.body, uniqueDir);
            createSymlink(req.body, uniqueDir);
            createProfile(req.body, uniqueDir, uniqueDirRemote);
            createConfig(req.body, uniqueDir, uniqueDirRemote);
            createUnits(req.body, uniqueDir);
            // createArchive(uniqueDir);
            spawnChild(req.body, profile, uniqueDir, uniqueDirRemote);
        }
    }
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
module.exports = router;
