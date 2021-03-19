const express = require("express");
const fs = require("fs");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const users = require("./routes/api/userController");
const runs = require("./routes/api/runController");
const units = require("./routes/api/unitController");
const path = require("path");
const cors = require("cors");
// const http = require("http");
// const https = require("https");
require("dotenv").config({ path: path.join(__dirname, ".env") });

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
require("./config/passport")(passport);
// Routes
app.use("/api/users", users);
app.use("/api/runs", passport.authenticate("jwt", { session: false }), runs);
app.use("/api/units", units);
const sock = "/tmp/bissprop.sock";
fs.stat(sock, function (err) {
    console.log(!err);

    if (!err) {
        fs.unlinkSync(sock);
    }
    app.listen(sock, (err) => {
        console.log(err);
        fs.chmodSync(sock, "775");
        console.log("Express server listening on " + sock);
    });
});
// app.listen("/tmp/bisspropSocket", function () {
//     console.log(`Server up and running !`);
//     fs.chmodSync("/tmp/bisspropSocket", 0777);
// });
// http.createServer(app).listen(80);
// https.createServer(app).listen(443);
