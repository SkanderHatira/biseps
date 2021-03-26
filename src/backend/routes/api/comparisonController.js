const express = require("express");
const path = require("path");
const router = express.Router();
const createProfile = require("../../helpers/createProfile");
const createConfig = require("../../helpers/createConfig");
const createUnits = require("../../helpers/createUnits");
const spawnChild = require("../../snakemake");
const spawnJbrowse = require("../../helpers/spawnJbrowse");

// Load input validation
const validateConfigurationInput = require("../../validation/comparisonValidation");
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
        return res.status(400).json(errors);
    } else {
        const uniqueDir = path.join(req.body.outdir, new Date().toISOString());
        const profile = path.join(uniqueDir, "config/profile");
        const newComparison = new Comparison({
            outdir: uniqueDir,
            profile: profile,
            samples: req.body.samples,
            comparisons: req.body.comparisons,
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
        createProfile(req.body, uniqueDir);
        createConfig(req.body, uniqueDir);
        createUnits(req.body, uniqueDir);
        spawnChild(profile);
    }
});
router.post("/visualize", (req, res) => {
    console.log(req.body);
    spawnJbrowse(req.body);
});
router.get("/", function (req, res) {
    Comparison.find({}, function (err, comparisons) {
        if (err)
            return res
                .status(500)
                .send("There was a problem finding the runs.");
        res.status(200).send(comparisons);
    }).populate("createdBy");
    console.log("GET method");
});

router.get("/:id", function (req, res) {
    Comparison.findById(req.params.id, function (err, comparison) {
        if (err)
            return res
                .status(500)
                .send("There was a problem finding comparisons.");
        res.status(200).send(comparison);
    }).populate("createdBy");
});
module.exports = router;
