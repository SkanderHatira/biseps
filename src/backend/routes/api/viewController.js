const express = require("express");
const path = require("path");
const router = express.Router();

const spawnChild = require("../../snakemake");
const spawnJbrowse = require("../../helpers/spawnJbrowse");

// Load input validation
const validateConfigurationInput = require("../../validation/viewValidation");
// Load Run model

const View = require("../../models/View");
const User = require("../../models/User");

// @route POST api/runs/Run
// @desc Run
// @access Public
router.post("/visualize", (req, res) => {
    console.log(req.body);
    // Form validation
    const { errors, isValid } = validateConfigurationInput(req.body);
    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    } else {
        const uniqueDir = path.join(req.body.outdir, new Date().toISOString());
        const newView = new View({
            outdir: uniqueDir,
            port: req.body.port,
            genomes: req.body.genomes,
            createdBy: req.body.userId,
        });
        newView
            .save()
            .then((view) => {
                res.json(view);
                User.findByIdAndUpdate(
                    view.createdBy,
                    { $push: { views: view._id } },
                    { safe: true, upsert: true, new: true },
                    function (err, model) {
                        console.log(err);
                    }
                );
            })
            .catch((err) => console.log(err));
        spawnJbrowse(req.body, uniqueDir);
    }
});
router.post("/nonassigned", (req, res) => {
    console.log(req.body);
});
router.get("/", function (req, res) {
    View.find({}, function (err, views) {
        if (err)
            return res
                .status(500)
                .send("There was a problem finding the runs.");
        res.status(200).send(views);
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
