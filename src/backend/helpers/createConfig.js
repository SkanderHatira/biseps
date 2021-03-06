const createConfig = (body, uniqueDir) => {
    const yaml = require("js-yaml");
    const fs = require("fs");
    const path = require("path");
    console.log("creating config");
    const config = {
        units: body.remote
            ? "config/units.tsv"
            : path.join(uniqueDir, "config/units.tsv"),
        platform: "linux",
        general: {
            outdir: body.remote ? "" : uniqueDir + "/",
            benchmark: body.benchmark || 1,
            genome_preparation: {
                threads: 12,
                extra: "",
                aligner: body.aligner,
            },
        },
        steps: {
            subsample: {
                activated: body.subsample ? "True" : "False",
            },
            trimming: { activated: "True" },
            quality: { activated: "True" },
            genome_preparation: { activated: "True" },
            methylation_extraction_bismark: { activated: "True" },
            methylation_calling: { activated: "True" },
        },
        resources: {
            ref: {
                genome: body.remote
                    ? path
                          .join("resources/genome", path.basename(body.genome))
                          .split(path.sep)
                          .join(path.posix.sep)
                    : body.genome,
            },
            adapters:
                body.customAdapters == ""
                    ? body.remote
                        ? path
                              .join(
                                  ".test/resources/adapters",
                                  body.adapters + ".fa"
                              )
                              .split(path.sep)
                              .join(path.posix.sep)
                        : path.join(
                              __dirname,
                              "../../resources/adapters",
                              body.adapters + ".fa"
                          ) || ""
                    : body.remote
                    ? path
                          .join(
                              "resources/adapters",
                              path.basename(body.adapters)
                          )
                          .split(path.sep)
                          .join(path.posix.sep)
                    : body.adapters,
        },

        params: {
            "trimmomatic-pe": {
                trimmer: "ILLUMINACLIP",
                "trimmer-options": `2:30:10:2:keepBothReads LEADING:3 TRAILING:3 MINLEN:${body.minlen}`,
                threads: 4,
                extra: "",
            },
            seqtk: { seed: 100, size: 10000, extra: "" },
            bismark: {
                aligner: body.aligner,
                aligner_options: "",
                instances: 4,
                score_min: "L,0," + String(body.minscore),
                N: body.n,
                L: body.l,
                extra: "",
                bool_flags: {
                    nucleotide_coverage: "True",
                    no_dovetail: "False",
                    non_directional: "False",
                },
            },
            deduplicate: { extra: "" },
            methylation_extraction: {
                bool_flags: {
                    bedGraph: "True",
                    CX: "True",
                    cytosine_report: "True",
                    comprehensive: "True",
                    split_by_chromosome: "False",
                },
                extra: "",
            },
            fastqc: { extra: "" },
            multiqc: { extra: "" },
        },
    };

    const yamlStr = yaml.dump(config);
    fs.writeFileSync(
        path.join(uniqueDir, "config", "config.yaml"),
        yamlStr,
        "utf8"
    );
};
module.exports = createConfig;
