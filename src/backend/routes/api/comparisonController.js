const express = require("express");
const path = require("path");
const router = express.Router();
const createUnitsComparison = require("../../helpers/createUnitsComparison");
const createConfigComparison = require("../../helpers/createConfigComparison");
const createProfileComparison = require("../../helpers/createProfileComparison");
const spawnChild = require("../../snakemake");

// Load input validation
const validateConfigurationInput = require("../../validation/comparisonConfiguration");
// Load Run model

const Comparison = require("../../models/Comparison");
const User = require("../../models/User");

// @route POST api/runs/Run
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
                __dirname,
                "../../../bisepsComparison/",
                date
            );
            const profile = path.join(
                uniqueDir,
                "config/profiles/localComparison"
            );

            const newComparison = new Comparison({
                outdir: uniqueDir,
                remoteDir: req.body.remoteDir,
                profile: profile,
                comparisons: req.body.comparisons,
                method: req.body.method,
                stat: req.body.stat,
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
            createUnitsComparison(req.body, uniqueDir);
            createConfigComparison(req.body, uniqueDir);
            // createProfile(req.body, uniqueDir);
            // createConfig(req.body, uniqueDir);
            // createUnits(req.body, uniqueDir);
            spawnChild(req.body, profile);
        } else {
            const date = new Date().getTime().toString();
            const uniqueDir = path.join(
                __dirname,
                "../../../bisepsComparison/",
                date
            );
            const uniqueDirRemote = path.join(req.body.remoteOutdir, date);
            const profile = req.body.cluster
                ? path.join(uniqueDir, "config/profiles/slurm")
                : path.join(uniqueDir, "config/profiles/local");

            const newComparison = new Comparison({
                outdir: uniqueDir,
                profile: profile,
                comparisons: req.body.comparisons,
                method: req.body.method,
                stat: req.body.stat,
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
            // cloneBiseps(req.body, uniqueDir);
            // createSymlink(req.body, uniqueDir);
            // createProfile(req.body, uniqueDir, uniqueDirRemote);
            // createConfig(req.body, uniqueDir, uniqueDirRemote);
            // createUnits(req.body, uniqueDir);
            // // createArchive(uniqueDir);
            // spawnChild(req.body, profile, uniqueDir, uniqueDirRemote);
        }
    }
});
router.get("/", function (req, res) {
    Comparison.find({}, function (err, comparisons) {
        if (err)
            return res
                .status(500)
                .send("There was a problem finding the comparisons.");
        res.status(200).send(comparisons);
    }).populate("createdBy");
    console.log("GET method");
});
module.exports = router;
