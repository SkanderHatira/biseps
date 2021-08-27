const express = require("express");
const path = require("path");
const router = express.Router();
const createUnitsComparison = require("../../helpers/createUnitsComparison");
const createConfigComparison = require("../../helpers/createConfigComparison");
const createProfileComparison = require("../../helpers/createProfileComparison");
const createSymlinkComparison = require("../../helpers/createSymlinkComparison");
const cloneBiseps = require("../../helpers/cloneBiseps");
const spawnChild = require("../../snakemake");

// Load input validation
const validateConfigurationInput = require("../../validation/comparisonConfiguration");
// Load Run model

const Comparison = require("../../models/Comparison");
const User = require("../../models/User");

// @route POST api/comparisons/Run
// @desc Run
// @access Public

router.post("/comparison", (req, res) => {
    console.log(req.body);

    // Form validation
    const { errors, isValid } = validateConfigurationInput(req.body);
    // Check validation
    if (!isValid) {
        console.log("invalidate");
        return res.status(400).json(errors);
    } else {
        console.log("made validation");
        if (!req.body.remote) {
            const date = new Date().getTime().toString();
            const uniqueDir = path.join(
                req.body.outdir,
                new Date().getTime().toString()
            );
            // const uniqueDir = path.join(
            //     __dirname,
            //     "../../../bisepsComparison/",
            //     date
            // );
            const profile = path.join(
                uniqueDir,
                "config/profiles/localComparison"
            );

            const newComparison = new Comparison({
                outdir: uniqueDir,
                machine: req.body.machine,
                genome: req.body.genome,
                remoteDir: req.body.remoteDir,
                profile: profile,
                comparisons: req.body.comparisons,
                remotecomparisons: req.body.remotecomparisons,
                method: req.body.method,
                stat: req.body.stat,
                contexts: req.body.contexts,
                binSize: req.body.binSize,
                pseudocountN: req.body.pseudocountN,
                pseudocountM: req.body.pseudocountM,
                pValueThreshold: req.body.pValueThreshold,
                minCytosinesCount: req.body.minCytosinesCount,
                minProportionDifference: req.body.minProportionDifference,
                minGap: req.body.minGap,
                minSize: req.body.minSize,
                minReadsPerCytosine: req.body.minReadsPerCytosine,
                remote: req.body.remote,
                cluster: req.body.cluster,
                createdBy: req.body.userId,
            });
            newComparison
                .save()
                .then((comparison) => {
                    res.json(comparison);
                    User.findByIdAndUpdate(
                        comparison.createdBy,
                        { $push: { comparisons: comparison._id } },
                        { safe: true, upsert: true, new: true },
                        function (err, model) {
                            console.log(err);
                        }
                    );
                })
                .catch((err) => console.log(err));
            console.log(newComparison);
            console.log("POST method");
            createProfileComparison(req.body, uniqueDir);
            createConfigComparison(req.body, uniqueDir);
            createUnitsComparison(req.body, uniqueDir);
            // createProfile(req.body, uniqueDir);
            // createConfig(req.body, uniqueDir);
            // createUnits(req.body, uniqueDir);
            spawnChild(req.body, profile, "", "", false);
        } else {
            const date = new Date().getTime().toString();
            // const uniqueDir = path.join(
            //     __dirname,
            //     "../../../bisepsComparison/",
            //     date
            // );
            const uniqueDir = path.join(
                req.body.outdir,
                new Date().getTime().toString()
            );
            const uniqueDirRemote = path.join(req.body.remoteDir, date);
            const profile = req.body.cluster
                ? path.join(uniqueDir, "config/profiles/slurmComparison")
                : path.join(uniqueDir, "config/profiles/localComparison");
            const homeDir = path.join(req.body.remoteDir, date);

            const newComparison = new Comparison({
                outdir: uniqueDir,
                profile: profile,
                remoteDir: uniqueDirRemote,
                genome: req.body.genome,
                machine: req.body.machine,
                comparisons: req.body.comparisons,
                remotecomparisons: req.body.remotecomparisons,
                method: req.body.method,
                stat: req.body.stat,
                contexts: req.body.contexts,
                binSize: req.body.binSize,
                pseudocountN: req.body.pseudocountN,
                pseudocountM: req.body.pseudocountM,
                pValueThreshold: req.body.pValueThreshold,
                minCytosinesCount: req.body.minCytosinesCount,
                minProportionDifference: req.body.minProportionDifference,
                minGap: req.body.minGap,
                minSize: req.body.minSize,
                minReadsPerCytosine: req.body.minReadsPerCytosine,
                remote: req.body.remote,
                cluster: req.body.cluster,
                createdBy: req.body.userId,
            });
            newComparison
                .save()
                .then((comparison) => {
                    res.json(comparison);
                    User.findByIdAndUpdate(
                        comparison.createdBy,
                        { $push: { comparisons: comparison._id } },
                        { safe: true, upsert: true, new: true },
                        function (err, model) {
                            console.log(err);
                        }
                    );
                })
                .catch((err) => console.log(err));

            console.log("POST method");
            cloneBiseps(req.body, uniqueDir);
            createSymlinkComparison(req.body, uniqueDir);
            createProfileComparison(req.body, uniqueDir, uniqueDirRemote);
            createConfigComparison(req.body, uniqueDir, uniqueDirRemote);
            createUnitsComparison(req.body, uniqueDir);
            // // createArchive(uniqueDir);
            spawnChild(req.body, profile, uniqueDir, uniqueDirRemote, false);
        }
    }
});
router.get("/:userId", function (req, res) {
    Comparison.find(
        { $or: [{ createdBy: [req.params.userId] }, { public: true }] },
        function (err, comparisons) {
            if (err)
                return res
                    .status(500)
                    .send("There was a problem finding the comparisons.");
            res.status(200).send(comparisons);
        }
    ).populate("createdBy");
    console.log("GET method");
});
router.delete("/:id", function (req, res) {
    const id = req.params.id;
    const userId = req.user._id;
    console.log(req.outdir);
    console.log(req.user);
    Comparison.deleteOne({ _id: id })
        .then((result) => {
            res.json(`Deleted ${id}`);
        })
        .catch((error) => console.error(error));
    User.findByIdAndUpdate(
        userId,
        { $pull: { comparisons: id } },
        { safe: true, upsert: true, new: true },
        function (err, model) {
            console.log(err);
        }
    );
});

router.post("/rerun", function (req, res) {
    console.log(req.body);
    const uniqueDir = req.body.outdir;

    if (!req.body.remote) {
        const profile = path.join(
            req.body.outdir,
            "config/profiles/localComparison"
        );
        spawnChild(req.body, profile, uniqueDir, "", req.body.unlock);
        console.log("Rerun Snakemake", profile);
    } else {
        const profile = path.join(
            req.body.remoteDir,
            req.body.cluster
                ? "config/profiles/slurmComparison"
                : "config/profiles/localComparison"
        );
        const uniqueDir = req.body.outdir;
        const uniqueDirRemote = req.body.remoteDir;
        spawnChild(
            req.body,
            profile,
            uniqueDir,
            uniqueDirRemote,
            req.body.unlock
        );
    }
});

router.put("/:id", (req, res, next) => {
    console.log(req.body);
    console.log(req.params);

    const updatedComparison = new Comparison({
        _id: req.params.id,
        ...req.body,
        public: req.body.public,
    });
    Comparison.updateOne({ _id: req.params.id }, updatedComparison)
        .then(() => {
            res.status(201).json({
                message: "Thing updated successfully!",
            });
        })
        .catch((error) => {
            console.log("something went wrong");
            res.status(400).json({
                error: error,
            });
        });
});
module.exports = router;
