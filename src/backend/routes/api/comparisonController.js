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
    // Form validation
    // const { errors, isValid } = validateConfigurationInput(req.body);
    // // Check validation
    // if (!isValid) {
    //     return res.status(400).json(errors);
    // } else {
    //     spawnJbrowse(req.body);
    // }
});
module.exports = router;
