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
        general: {
            outdir: body.remote ? uniqueDirRemote + "/" : uniqueDir + "/",
        },
        resources: {
            ref: {
                genome: body.remote
                    ? path.join("resources/genome", path.basename(body.genome))
                    : body.genome,
            },
            annot: body.annot,
        },
        params: {
            method: body.method,
            binSize: body.binsize,
            kernelFunction: body.kernelFunction,
            test: body.stat,
            context: body.contexts,
            pseudocountM: body.pseudocountM,
            pseudocountN: body.pseudocountN,
            pValueThreshold: body.pValueThreshold,
            minCytosinesCount: body.minCytosinesCount,
            minProportionDifference: body.minProportionDifference,
            minGap: body.minGap,
            minSize: body.minSize,
            minReadsPerCytosine: body.minReadsPerCytosine,
            cores: body.remote ? "10" : cpuCount,
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
