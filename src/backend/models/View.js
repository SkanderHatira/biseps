const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const viewSchema = new Schema({
    createdBy: { type: Schema.Types.ObjectId, ref: "users" },
    outdir: {
        type: String,
        required: true,
        default: "",
    },

    genomes: [{ type: String, required: true }],
});
// eslint-disable-next-line no-undef
module.exports = Views = mongoose.model("views", viewSchema);
