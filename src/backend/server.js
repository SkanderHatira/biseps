const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const users = require("./routes/api/userController");
const runs = require("./routes/api/runController");
const units = require("./routes/api/unitController");
var cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
require("dotenv").config();
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

const port = process.env.PORT;

app.listen(port, () => console.log(`Server up and running on port ${port} !`));
