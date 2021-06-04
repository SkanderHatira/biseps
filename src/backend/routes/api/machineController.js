const express = require("express");
const path = require("path");
const router = express.Router();

const fs = require("fs");

// Load input validation
const validateConfigurationInput = require("../../validation/machineConfiguration");
// Load Run model

const Machine = require("../../models/Machine");
const User = require("../../models/User");

// @route POST api/runs/Run
// @desc Run
// @access Public
router.post("/machine", (req, res) => {
    console.log(req.body);
    // Form validation
    const { errors, isValid } = validateConfigurationInput(req.body);
    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    } else {
        const newMachine = new Machine({
            hostname: req.body.hostname,
            username: req.body.username,
            port: req.body.port,
            privateKey: req.body.privateKey,
            script: req.body.script,
            password: req.body.password,
            createdBy: req.body.userId,
        });
        newMachine
            .save()
            .then((machine) => {
                res.json(machine);
                User.findByIdAndUpdate(
                    machine.createdBy,
                    { $push: { machines: machine._id } },
                    { safe: true, upsert: true, new: true },
                    function (err, model) {
                        console.log(err);
                    }
                );
            })
            .catch((err) => console.log(err));

        console.log("POST method");
    }
});
router.delete("/:id", function (req, res) {
    const id = req.params.id;
    const userId = req.user._id;
    Machine.deleteOne({ _id: id })
        .then((result) => {
            res.json(`Deleted ${id}`);
        })
        .catch((error) => console.error(error));
    User.findByIdAndUpdate(
        userId,
        { $pull: { machines: id } },
        { safe: true, upsert: true, new: true },
        function (err, model) {
            console.log(err);
        }
    );
});
router.get("/", function (req, res) {
    Machine.find({}, function (err, machines) {
        if (err)
            return res
                .status(500)
                .send("There was a problem finding the machines.");
        res.status(200).send(machines);
    }).populate("createdBy");
    console.log("GET method");
});

router.get("/:id", function (req, res) {
    Machine.findById(req.params.id, function (err, unit) {
        if (err)
            return res
                .status(500)
                .send("There was a problem finding the users.");
        res.status(200).send(unit);
    }).populate("createdBy");
});

module.exports = router;
