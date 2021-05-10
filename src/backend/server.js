const express = require("express");
const fs = require("fs");
var net = require("net");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const path = require("path");
const users = require("../backend/routes/api/userController");
const runs = require("../backend/routes/api/runController");
const views = require("../backend/routes/api/viewController");
const comparisons = require("../backend/routes/api/comparisonController");

const cors = require("cors");
// const http = require("http");
// const https = require("https");
require("dotenv").config({ path: path.join(__dirname, "../backend/.env") });
console.log(__dirname);
const app = express();
app.use(cors());
app.use(
    bodyParser.urlencoded({
        extended: false,
    })
);
app.use(bodyParser.json());
console.log("where am i");
mongoose
    .connect(process.env.DATABASE, { useNewUrlParser: true })
    .then(() => console.log("MongoDB successfully connected"))
    .catch((err) => console.log(err));
// Passport middleware
app.use(passport.initialize());
// Passport config
require("../backend/config/passport")(passport);
// Routes
app.use("/api/users", users);
app.use("/api/runs", passport.authenticate("jwt", { session: false }), runs);
app.use(
    "/api/jbrowse",
    passport.authenticate("jwt", { session: false }),
    views
);
app.use(
    "/api/comparisons",
    passport.authenticate("jwt", { session: false }),
    comparisons
);
// const sock = "/tmp/bissprop.sock";
const sock = process.argv[2];
fs.stat(sock, function (err) {
    console.log(!err);

    if (!err) {
        fs.unlinkSync(sock);
    }
    app.listen(sock, (err) => {
        fs.chmodSync(sock, "775");
        console.log("Express server listening on " + sock);
    });
});

// app.listen(sock, (err) => {
//     fs.chmodSync(sock, "775");
//     console.log("Express server listening on " + sock);
// });
// app.listen("/tmp/bisspropSocket", function () {
//     console.log(`Server up and running !`);
//     fs.chmodSync("/tmp/bisspropSocket", 0777);
// });
// http.createServer(app).listen(80);
// https.createServer(app).listen(443);
