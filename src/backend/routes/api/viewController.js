const express = require("express");
const path = require("path");
const router = express.Router();
const createJB = require("../../helpers/createJbrowse");
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
    // Form validation
    const { errors, isValid } = validateConfigurationInput(req.body);
    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    } else {
        spawnJbrowse(req.body);
    }
});
router.post("/resetJB", (req, res) => {
    createJB(req.body.jbPath, true);
});
router.post("/serve", (req, res) => {
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
