const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const path = require("path");
const portastic = require("portastic");
const handler = require("serve-handler");
const http = require("http");
const createJB = require("../../helpers/createJbrowse");
// Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// Load User model
const User = require("../../models/User");

// @route POST approcess.envi/users/register
// @desc Register user
// @access Public
router.post("/register", (req, res) => {
    // Form validation
    const { errors, isValid } = validateRegisterInput(req.body);
    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }
    User.findOne({ name: req.body.name }).then((user) => {
        if (user) {
            return res
                .status(400)
                .json({ name: "Account Name already exists" });
        } else {
            const jbPath = path.join(
                __dirname,
                `../../../resources/users/${req.body.name}`
            );
            createJB(jbPath);
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                jbPath,
            });
            // Hash password before saving in database
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser
                        .save()
                        .then((user) => res.json(user))
                        .catch((err) => console.log(err));
                });
            });
        }
    });
});

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", (req, res) => {
    // Form validation
    const { errors, isValid } = validateLoginInput(req.body);
    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }
    const name = req.body.name;
    const password = req.body.password;
    // Find user by name
    User.findOne({ name }).then((user) => {
        // Check if user exists
        if (!user) {
            return res
                .status(404)
                .json({ namenotfound: "Account name not found" });
        }
        // Check password
        bcrypt.compare(password, user.password).then((isMatch) => {
            if (isMatch) {
                // User matched
                // Create JWT Payload
                // portastic
                //     .find({
                //         min: 30000,
                //         max: 35000,
                //         retrieve: 1,
                //     })
                //     .then(function (port) {
                //         console.log(`found  http://localhost:${port} free`);
                const payload = {
                    id: user.id,
                    name: user.name,
                    jbPath: user.jbPath,
                    email: user.email,
                    runs: user.runs,
                    views: user.runs,
                    machines: user.machines,
                };
                // Sign token
                jwt.sign(
                    payload,
                    process.env.SECRET,
                    {
                        expiresIn: 31556926, // 1 year in seconds
                    },
                    (err, token) => {
                        res.json({
                            success: true,
                            token: "Bearer " + token,
                        });
                    }
                );
                // });
            } else {
                return res
                    .status(400)
                    .json({ passwordincorrect: "Password incorrect" });
            }
        });
    });
});
// // @route GET api/units/user
// router.get("/", function (req, res) {
//     User.find({}, function (err, units) {
//         if (err)
//             return res
//                 .status(500)
//                 .send("There was a problem finding the users.");
//         res.status(200).send(units);
//     });
// });
router.get("/:id", function (req, res) {
    User.findById(req.params.id)
        .populate("runs") // key to populate
        .populate("machines")
        .then((user) => {
            res.json(user);
        })
        .catch((err) => console.log(err));

    // User.findById(req.params.id, function (err, units) {
    //     if (err)
    //         return res
    //             .status(500)
    //             .send("There was a problem finding the users.");
    //     res.status(200).send(units);
    // });
});
// router.put("/:id", function (req, res) {
//     const updatedUser = new User({
//         _id: req.params.id,
//         name: req.body.name,
//         email: req.body.email,
//         password: req.body.password,
//         machines: req.body.machines,
//     });
//     // Hash password before saving in database
//     bcrypt.genSalt(10, (err, salt) => {
//         bcrypt.hash(updatedUser.password, salt, (err, hash) => {
//             if (err) throw err;
//             updatedUser.password = hash;
//             updatedUser.save();
//         });
//     });
//     User.updateOne({ _id: req.params.id }, updatedUser)
//         .then(() => {
//             console.log(res);
//             res.status(201).json({
//                 message: "Thing updated successfully!",
//             });
//         })
//         .catch((error) => {
//             res.status(400).json({
//                 error: error,
//             });
//         });

//     // User.findByIdAndUpdate(
//     //     req.params.id,
//     //     updatedUser,
//     //     { new: true },
//     //     function (err, user) {
//     //         console.log(updatedUser);
//     //         if (err)
//     //             return res
//     //                 .status(500)
//     //                 .send("There was a problem updating the user.");
//     //         res.status(200).send(user);
//     //     }
//     // );
// });
router.put("/:id", (req, res, next) => {
    const updatedUser = new User({
        _id: req.params.id,
        name: req.body.name,
        email: req.body.email,
        machines: req.body.machines,
    });
    User.updateOne({ _id: req.params.id }, updatedUser)
        .then(() => {
            res.status(201).json({
                message: "Thing updated successfully!",
            });
        })
        .catch((error) => {
            res.status(400).json({
                error: error,
            });
        });
});
module.exports = router;
