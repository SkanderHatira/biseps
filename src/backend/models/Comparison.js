const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const comparisonSchema = new Schema({
    createdBy: { type: Schema.Types.ObjectId, ref: "users" },
    outdir: { type: String, required: true },
    remoteDir: { type: String, required: false },
    method: { type: String, required: false },
    date: {
        type: Date,
        default: Date.now,
    },
    public: {
        type: Boolean,
        required: false,
        default: false,
    },
    stat: { type: String, required: false },
    genome: { type: String, required: false },
    contexts: [{ type: String, required: false }],
    binSize: { type: Number, required: false },
    pseudocountN: { type: Number, required: false },
    pseudocountM: { type: Number, required: false },
    pValueThreshold: { type: Number, required: false },
    minCytosinesCount: { type: Number, required: false },
    minProportionDifference: { type: Number, required: false },
    minGap: { type: Number, required: false },
    minSize: { type: Number, required: false },
    minReadsPerCytosine: { type: Number, required: false },
    remote: { type: Boolean, required: false },
    cluster: { type: Boolean, required: false },
    machine: {
        _id: {
            type: String,
            default: "",
        },
        hostname: {
            type: String,
            default: "",
        },
        username: {
            type: String,
            default: "",
        },
        port: {
            type: Number,
            default: 22,
        },
        privateKey: {
            type: String,
            default: "",
        },
        script: {
            type: String,
            default: "",
        },
        password: {
            type: String,
            default: "",
        },
    },
    comparisons: [
        {
            id: { type: String, required: false },
            name: { type: String, required: false },
            control: { type: String, required: false },
            treatment: { type: String, required: false },
        },
    ],
    remotecomparisons: [
        {
            id: { type: String, required: false },
            name: { type: String, required: false },
            control: { type: String, required: false },
            treatment: { type: String, required: false },
        },
    ],
});
// eslint-disable-next-line no-undef
module.exports = Comparison = mongoose.model("comparisons", comparisonSchema);
