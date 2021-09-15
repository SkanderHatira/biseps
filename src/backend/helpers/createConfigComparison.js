const createConfigComparison = (body, uniqueDir, uniqueDirRemote) => {
    const yaml = require("js-yaml");
    const fs = require("fs");
    const os = require("os");
    const path = require("path");
    console.log("creating config");
    const cpuCount = os.cpus().length;

    const config = {
        comparisons: body.remote
            ? "config/comparison.tsv"
            : path.join(uniqueDir, "config/comparison.tsv"),
        platform: "linux",
        general: {
            outdir: body.remote ? "" : uniqueDir + "/",
        },
        resources: {
            ref: {
                genome: body.remote
                    ? path.join("resources/genome", path.basename(body.genome))
                    : body.genome,
            },
            annot: body.remote
                ? path.join("resources/annotation", path.basename(body.annot))
                : body.annot,
        },
        params: {
            method: body.method,
            binSize: Number(body.binsize),
            kernelFunction: body.kernelFunction,
            test: body.stat,
            context: body.contexts,
            pseudocountM: Number(body.pseudocountM),
            pseudocountN: Number(body.pseudocountN),
            pValueThreshold: Number(body.pValueThreshold),
            minCytosinesCount: Number(body.minCytosinesCount),
            minProportionDifference: Number(body.minProportionDifference),
            minGap: parseInt(body.minGap),
            minSize: parseInt(body.minSize),
            minReadsPerCytosine: Number(body.minReadsPerCytosine),
            cores: body.remote ? 10 : cpuCount,
        },
    };
    const yamlStr = yaml.dump(config);
    fs.writeFileSync(
        path.join(uniqueDir, "config/configComparison.yaml"),
        yamlStr,
        "utf8"
    );
};
module.exports = createConfigComparison;
