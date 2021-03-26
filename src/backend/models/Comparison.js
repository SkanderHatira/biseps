const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const comparisonSchema = new Schema({
    createdBy: { type: Schema.Types.ObjectId, ref: "users" },
    status: { type: String, required: true, default: "running" },
    outdir: {
        type: String,
        required: true,
        default: "",
    },

    samples: [
        {
            sample: { type: String, required: false },
            samplePath: { type: String, required: false },
        },
    ],
    comparison: [
        {
            id: { type: String, required: false },
            sample: { type: String, required: false },
            techrep: { type: Number, required: false },
            biorep: { type: Number, required: false },
            control: { type: String, required: false },
            treatment: { type: String, required: false },
        },
    ],
});
// eslint-disable-next-line no-undef
module.exports = Comparison = mongoose.model("comparisons", comparisonSchema);
