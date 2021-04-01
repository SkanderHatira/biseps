const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const path = require("path");
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
    User.findOne({ email: req.body.email }).then((user) => {
        if (user) {
            return res.status(400).json({ email: "Email already exists" });
        } else {
            createJB(req.body);
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
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
    const email = req.body.email;
    const password = req.body.password;
    // Find user by email
    User.findOne({ email }).then((user) => {
        // Check if user exists
        if (!user) {
            return res.status(404).json({ emailnotfound: "Email not found" });
        }
        // Check password
        bcrypt.compare(password, user.password).then((isMatch) => {
            if (isMatch) {
                // User matched
                // Create JWT Payload
                const payload = {
                    id: user.id,
                    name: user.name,
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
router.put("/:id", function (req, res) {
    const updatedUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    });
    // Hash password before saving in database
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(updatedUser.password, salt, (err, hash) => {
            if (err) throw err;
            updatedUser.password = hash;
            updatedUser.save();
        });
    });
    User.findByIdAndUpdate(
        req.params.id,
        updatedUser,
        { new: true },
        function (err, user) {
            console.log(updatedUser);
            if (err)
                return res
                    .status(500)
                    .send("There was a problem updating the user.");
            res.status(200).send(user);
        }
    );
});
module.exports = router;
