const express = require("express");
const fs = require("fs");
var net = require("net");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const path = require("path");
const users = require("../backend/routes/api/userController");
const machines = require("../backend/routes/api/machineController");
const runs = require("../backend/routes/api/runController");
const views = require("../backend/routes/api/viewController");
const comparisons = require("../backend/routes/api/comparisonController");
const homedir = require("os").homedir();
const configPath = path.join(homedir, ".biseps/biseps.json");
const config = JSON.parse(fs.readFileSync(configPath, "utf8"));
const cors = require("cors");
require("dotenv").config({ path: path.join(__dirname, "../backend/.env") });
const sock = process.argv[2];
const unixSocket = process.argv[3];

const app = express();
app.use(cors());
app.use(
    bodyParser.urlencoded({
        extended: false,
    })
);
app.use(bodyParser.json());
console.log(encodeURIComponent(unixSocket));
const connectWithRetry = () => {
    return mongoose.connect(
        process.platform == "win32"
            ? unixSocket
            : config.database !== ""
            ? config.database
            : `mongodb://${encodeURIComponent(unixSocket)}`,
        { useNewUrlParser: true },
        function (err) {
            if (err) {
                console.error(
                    "Failed to connect to mongo on startup - retrying in 1 sec",
                    err
                );
                setTimeout(connectWithRetry, 1000, 5);
            } else {
                console.log("MongoDB successfully connected");
            }
        }
    );
};
connectWithRetry();
// mongoose
//     .connect(process.env.DATABASE, { useNewUrlParser: true })
//     .then(() => console.log("MongoDB successfully connected"))
//     .catch((err) => console.log(err));
// mongoose.connection.on("error", (err) => {
//     console.log(err);
// });
// Passport middleware
app.use(passport.initialize());
// Passport config
require("../backend/config/passport")(passport);
// Routes
app.use("/api/users", users);
app.use(
    "/api/machines",
    passport.authenticate("jwt", { session: false }),
    machines
);

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

fs.stat(sock, function (err) {
    console.log(!err);

    if (!err) {
        fs.unlinkSync(sock);
    }
    app.listen(sock, (err) => {
        // fs.chmodSync(sock, "755");
        console.log("Express server listening on " + sock);
    });
});
