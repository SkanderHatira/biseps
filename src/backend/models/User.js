const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    jbPath: {
        type: String,
        required: true,
    },
    runs: [
        {
            type: Schema.Types.ObjectId,
            ref: "runs",
        },
    ],
    views: [
        {
            type: Schema.Types.ObjectId,
            ref: "views",
        },
    ],
    machines: [
        {
            type: Schema.Types.ObjectId,
            ref: "machines",
        },
    ],
});

// eslint-disable-next-line no-undef
module.exports = User = mongoose.model("users", UserSchema);
