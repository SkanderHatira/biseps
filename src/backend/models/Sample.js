const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SampleSchema = Schema({
    _id: {
        type: Number,
        ref: "Run",
    },
    sample: {
        type: String,
    },
    config: {
        type: Schema.Types.ObjectId,
        ref: "Unit",
    },
});

// eslint-disable-next-line no-undef
module.exports = Sample = mongoose.model("samples", SampleSchema);
