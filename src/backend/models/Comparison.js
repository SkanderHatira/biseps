const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const comparisonSchema = new Schema({
    createdBy: { type: Schema.Types.ObjectId, ref: "users" },
    outdir: {
        type: String,
        required: true,
        default: "",
    },
    method: { type: String, required: false },
    stat: { type: String, required: false },
    comparisons: [
        {
            control: [{ type: String, required: false }],
            treatment: [{ type: String, required: false }],
        },
    ],
});
// eslint-disable-next-line no-undef
module.exports = Unit = mongoose.model("units", comparisonSchema);
