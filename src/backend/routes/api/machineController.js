const express = require("express");
const router = express.Router();
const ping = require("ping");
connect = require("ssh2-connect");
exec = require("ssh2-exec");
// Load input validation
const validateConfigurationInput = require("../../validation/machineConfiguration");
// Load Run model

const Machine = require("../../models/Machine");
const User = require("../../models/User");

// @route POST api/runs/Run
// @desc Run
// @access Public
router.post("/machine", (req, res) => {
    // Form validation
    const { errors, isValid } = validateConfigurationInput(req.body);
    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    } else {
        const host = req.body.hostname;
        const localhost = {
            host: req.body.hostname,
            port: req.body.port,
            username: req.body.username,
            ...(!(req.body.privateKey === "") && {
                privateKey: require("fs").readFileSync(req.body.privateKey),
            }),
            password: req.body.password,
        };
        connect(localhost, function (err, ssh) {
            child = exec(
                { command: "pwd", ssh: ssh },
                function (err, stdout, stderr) {
                    console.log(stdout);
                    const newMachine = new Machine({
                        ...req.body,
                        homepath: stdout.trim(),
                    });
                    ping.sys.probe(host, function (isAlive) {
                        const msg = isAlive
                            ? "host " + host + " is alive"
                            : "host " + host + " is dead";
                        console.log(msg);
                        if (isAlive) {
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
                        } else {
                            return res.status(400).json({
                                error: "Cannot connect to remote machine, make sure your logging credentials are correct",
                            });
                        }
                    });
                }
            );
            child.stdout.on("data", function (data) {
                console.log(data);
            });
            child.on("exit", function (code) {
                console.log("Exit", code);
            });
        });
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
