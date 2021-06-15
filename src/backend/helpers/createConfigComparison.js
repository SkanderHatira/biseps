const createConfigComparison = (body, uniqueDir, uniqueDirRemote) => {
    const yaml = require("js-yaml");
    const fs = require("fs");
    const path = require("path");
    console.log("creating config");
    const config = {
        comparisons: body.remote
            ? "config/units.tsv"
            : path.join(uniqueDir, "config/units.tsv"),
        general: {
            outdir: body.remote ? uniqueDirRemote + "/" : uniqueDir + "/",
        },
        resources: {
            ref: {
                genome: body.remote
                    ? path.join("resources/genome", path.basename(body.genome))
                    : body.genome,
            },
        },
        params: {
            method: body.method,
            binSize: body.binSize,
            kernelFunction: body.kernelFunction,
            test: body.test,
            pseudocountM: body.pseudocountM,
            pseudocountN: body.pseudocountN,
            pValueThreshold: body.pValueThreshold,
            minCytosinesCount: body.minCytosinesCount,
            minProportionDifference: body.minProportionDifference,
            minGap: body.minGap,
            minSize: body.minSize,
            minReadsPerCytosine: body.minReadsPerCytosine,
            cores: body.cores,
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
