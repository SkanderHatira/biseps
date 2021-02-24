const mongoose = require("mongoose");
const Schema = mongoose.Schema;

  
// Create Schema
const RunSchema = new Schema({
    user : { type: Schema.Types.ObjectId, ref: 'User' },
    sampleFile: {
        type: String,
        required: true
    },
    unitsFile: {
      type: String,
      required: true
    },
    outdir: {
      type: String,
      required: true,
      default: ''
    },
    genome: {
        type: String,
        required: true,
      },
    adapters: {
      type: String,
    },
    steps: {
        subsample: {
            type : Boolean,
            required: true,
            default: false
            },
        trimming: {
            type : Boolean,
            required: true,
            default: true
        },
        
        quality: {
            type : Boolean,
            required: true,
            default: true
        },
        
        genome_preparation: {
            type : Boolean,
            required: true,
            default: true

        },
        methylation_extraction_bismark: {
            type : Boolean,
            required: true,
            default: true

        },
        methylation_calling: {
            type : Boolean,
            required: true,
            default: true
        }
    },
    samples: [{type : Schema.Types.ObjectId, ref: 'Sample'}],
  });
  // eslint-disable-next-line no-undef
  module.exports = Run = mongoose.model("runs", RunSchema);