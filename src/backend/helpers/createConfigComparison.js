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
                    ? path
                          .join("resources/genome", path.basename(body.genome))
                          .split(path.sep)
                          .join(path.posix.sep)
                    : body.genome,
            },
            annot: body.remote
                ? body.annot == ""
                    ? ""
                    : path
                          .join(
                              "resources/annotation",
                              path.basename(body.annot)
                          )
                          .split(path.sep)
                          .join(path.posix.sep)
                : body.annot,
        },
        params: {
            method: body.method,
            windowSize: Number(body.binsize),
            stepSize: Number(body.stepsize),
            test: body.stat,
            overdispersion: body.overdispersion,
            qValue: Number(body.pValueThreshold),
            minCov: Number(body.minReadsPerCytosine),
            minDiff: Number(body.minProportionDifference),
            context: body.contexts,
            species: body.species,
        },
    };
    const yamlStr = yaml.dump(config);
    fs.writeFileSync(
        path.join(uniqueDir, "config", "configComparison.yaml"),
        yamlStr,
        "utf8"
    );
};
module.exports = createConfigComparison;
