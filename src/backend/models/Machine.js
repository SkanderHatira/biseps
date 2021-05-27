const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const machineSchema = new Schema({
    createdBy: { type: Schema.Types.ObjectId, ref: "users" },
    hostname: { type: String, required: true },
    username: { type: String, required: true },
    port: { type: Number, required: true },
    privateKey: { type: String, required: true },
    script: { type: String, required: false },
});
// eslint-disable-next-line no-undef
module.exports = Machines = mongoose.model("machines", machineSchema);
