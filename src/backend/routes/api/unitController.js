const express = require("express");
const router = express.Router();
const path = require("path");

// Load input validation
const validateUnitConfigInput = require(path.join(
    __dirname,
    "../../validation/unitConfiguration"
));
// Load Run model

const UnitConfig = require(path.join(__dirname, "../../models/Unit"));

// @route POST api/units/unitconfig
router.post("/unitconfig", (req, res) => {
    // Form validation
    const { errors, isValid } = validateUnitConfigInput(req.body);
    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    } else {
        const newUnitConfig = new UnitConfig({
            trimmomatic: {
                trimmer: req.body.trimmer,
                trimmerOptions: req.body.trimmerOptions,
                threads: req.body.threads,
                extra: req.body.extra,
            },
            seqtk: {
                seed: req.body.seed,
                size: req.body.size,
                extra: req.body.extra,
            },
            bismark: {
                aligner: req.body.aligner,
                alignerOptions: req.body.alignerOptions,
                instances: req.body.instances,
                scoreMin: req.body.scoreMin,
                n: req.body.n,
                l: req.body.l,
                boolFlags: {
                    nucleotideCoverage: req.body.nucleotideCoverage,
                    noDovetail: req.body.noDovetail,
                    nonDirectional: req.body.nonDirectional,
                },
                extra: req.body.extra,
            },

            deduplicate: {
                extra: req.body.extra,
            },
            methylationExtraction: {
                boolFlags: {
                    bedGraph: req.body.bedGraph,
                    CX: req.body.CX,
                    cytosineReport: req.body.cytosineReport,
                    comprehensive: req.body.comprehensive,
                    splitByChromosome: req.body.splitByChromosome,
                },
                extra: req.body.extra,
            },

            fastqc: {
                extra: req.body.extra,
            },

            multiqc: {
                extra: req.body.extra,
            },
        });
        newUnitConfig
            .save()
            .then((unit) => res.json(unit))
            .catch((err) => console.log(err));
    }
});

// @route GET api/units/unitconfig
router.get("/unitconfig", function (req, res) {
    UnitConfig.find({}, function (err, units) {
        if (err)
            return res
                .status(500)
                .send("There was a problem finding the units.");
        res.status(200).send(units);
    });
});

// @route GET api/units/unitconfig/:id
router.get("/unitconfig/:id", function (req, res) {
    UnitConfig.findById(req.params.id, function (err, unit) {
        if (err)
            return res
                .status(500)
                .send("There was a problem finding the unit.");
        if (!unit) return res.status(404).send("Unit could not be found.");
        res.status(200).send(unit);
    });
});

// @route DELETE api/units/unitconfig/:id
router.delete("/unitconfig/:id", function (req, res) {
    UnitConfig.findByIdAndRemove(req.params.id, function (err, unit) {
        if (err)
            return res
                .status(500)
                .send("There was a problem deleting the unit.");
        res.status(200).send("unit " + unit._id + " was deleted.");
    });
});

module.exports = router;
