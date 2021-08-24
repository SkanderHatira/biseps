const express = require("express");
const path = require("path");
const router = express.Router();
const createProfile = require("../../helpers/createProfile");
const createConfig = require("../../helpers/createConfig");
const createUnits = require("../../helpers/createUnits");
const createSymlink = require("../../helpers/createSymlink");
const cloneBiseps = require("../../helpers/cloneBiseps");
const createArchive = require("../../helpers/createArchive");

const spawnChild = require("../../snakemake");
const fs = require("fs");

// Load input validation
const validateConfigurationInput = require("../../validation/sampleConfiguration");
// Load Run model

const Run = require("../../models/Run");
const User = require("../../models/User");

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
        if (!req.body.remote) {
            const uniqueDir = path.join(
                req.body.outdir,
                new Date().getTime().toString()
            );
            const profile = path.join(uniqueDir, "config/profiles/local");

            const newRun = new Run({
                params: {
                    trimmomatic: {
                        trimmerOptions: `2:30:10:2:keepBothReads LEADING:3 TRAILING:3 MINLEN:${req.body.minlen}`,
                    },
                    bismark: {
                        aligner: req.body.aligner,
                        alignerOptions: req.body.alignerOptions,
                        instances: req.body.instances,
                        scoreMin: req.body.scoreMin,
                        n: req.body.n,
                        l: req.body.l,
                        boolFlags: {
                            nucleotideCoverage: req.body.nucleotideCoverage,
                            noDovetail: req.body.noDovetail,
                            nonDirectional: req.body.nonDirectional,
                        },
                    },
                },
                outdir: uniqueDir,
                profile: profile,
                genome: req.body.genome,
                remote: req.body.remote,
                cluster: req.body.cluster,
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
            const date = new Date().getTime().toString();
            const uniqueDir = path.join(req.body.outdir, date);
            const uniqueDirRemote = path.join(req.body.remoteDir, date);
            const homeDir = path.join(req.body.remoteDir, date);
            console.log(homeDir);
            const profile = req.body.cluster
                ? path.join(uniqueDir, "config/profiles/slurm")
                : path.join(uniqueDir, "config/profiles/local");

            const newRun = new Run({
                outdir: uniqueDir,
                remoteDir: uniqueDirRemote,
                cluster: req.body.cluster,
                params: {
                    trimmomatic: {
                        trimmerOptions: `2:30:10:2:keepBothReads LEADING:3 TRAILING:3 MINLEN:${req.body.minlen}`,
                    },
                    bismark: {
                        aligner: req.body.aligner,
                        alignerOptions: req.body.alignerOptions,
                        instances: req.body.instances,
                        scoreMin: req.body.scoreMin,
                        n: req.body.n,
                        l: req.body.l,
                        boolFlags: {
                            nucleotideCoverage: req.body.nucleotideCoverage,
                            noDovetail: req.body.noDovetail,
                            nonDirectional: req.body.nonDirectional,
                        },
                    },
                },
                profile: profile,
                remote: req.body.remote,
                machine: req.body.machine,
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
            spawnChild(req.body, profile, uniqueDir, uniqueDirRemote, homeDir);
        }
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
    console.log(req.body);
    const uniqueDir = req.body.outdir;

    if (!req.body.remote) {
        const profile = path.join(req.body.outdir, "config/profiles/local");
        spawnChild(req.body, profile, uniqueDir);
        console.log("Rerun Snakemake", profile);
    } else {
        const profile = path.join(
            req.body.remoteDir,
            req.body.cluster ? "config/profiles/slurm" : "config/profiles/local"
        );
        const uniqueDirRemote = req.body.remoteDir;
        const homeDir = path.join(req.body.remoteDir, uniqueDirRemote);
        spawnChild(req.body, profile, uniqueDir, uniqueDirRemote, homeDir);
    }
});

module.exports = router;
