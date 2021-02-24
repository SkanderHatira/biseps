const mongoose = require("mongoose");
const Schema = mongoose.Schema;

  
// Create Schema
const unitSchema = new Schema({
    _sample : { type: String, ref: 'Sample' },
    trimmomatic :  {
        trimmer: {
            type: String,
            default: 'ILLUMINACLIP'
        },
        trimmerOptions: {
            type: String,
            default: '2:30:10:2:keepBothReads LEADING:3 TRAILING:3 MINLEN:36'
        },
        threads: {
            type: Number,
            default: 32
        },
        extra: {
            type: String,
            default: ''
        },
    },
    seqtk :  {
        seed: {
            type: Number,
            default: 100
        },
        size: {
            type: Number,
            default: 10000
        },
        extra: {
            type: String,
            default: ''
        },
    },

    bismark :  {
        aligner: {
            type: String,
            default: 'bowtie2',
            required: true 
        },
        alignerOptions: {
            type: String,
            default: ''
        },
        instances: {
            type: Number,
            default: 4
        },
        scoreMin: {
            type: String,
            default: 'L,0,-0.6'
        },
        n: {
            type: Number,
            default: 0
        },
        l: {
            type: Number,
            default: 20
        },
        boolFlags: {
        nucleotideCoverage: {type:  Boolean , default:true },
        noDovetail: {type:  Boolean , default: false  },
        nonDirectional: {type:  Boolean , default: false }  
        } ,
        
        extra: {
            type: String,
            default: ''
        },
    },

    deduplicate :  {
        extra: {
            type: String,
            default: ''
        },
    },

    methylationExtraction :  {
        boolFlags: {
            bedGraph: {type:  Boolean , default:true },
            CX: {type:  Boolean , default: true  },
            cytosineReport: {type:  Boolean , default: true } ,
            comprehensive: {type:  Boolean , default: true  },
            splitByChromosome: {type:  Boolean , default: false }
            },
        extra: {
            type: String,
            default: ''
        },
    },

    fastqc :  {
        extra: {
            type: String,
            default: ''
        },
    },

    multiqc :  {
        extra: {
            type: String,
            default: ''
        },
    },
    
  });
  // eslint-disable-next-line no-undef
  module.exports = Unit = mongoose.model("units", unitSchema);