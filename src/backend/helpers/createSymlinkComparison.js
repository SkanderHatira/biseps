const createSymlinkComparison = (body, uniqueDir) => {
    const fs = require("fs-extra");
    const path = require("path");
    body.comparisons.map((comparison) => {
        const controlFiles = comparison.control.split(",");
        const treatmentFiles = comparison.treatment.split(",");

        for (const file in controlFiles) {
            fs.symlinkSync(
                controlFiles[file],
                path.join(uniqueDir, "data", path.basename(controlFiles[file])),
                "file"
            );
        }
        for (const file in treatmentFiles) {
            fs.symlinkSync(
                treatmentFiles[file],

                path.join(
                    uniqueDir,
                    "data",
                    path.basename(treatmentFiles[file])
                ),
                "file"
            );
        }
    });
    fs.symlinkSync(
        body.genome,
        path.join(uniqueDir, "resources", "genome", path.basename(body.genome)),
        "file"
    );
    body.annot !== ""
        ? fs.symlinkSync(
              body.annot,
              path.join(
                  uniqueDir,
                  "resources",
                  "annotation",
                  path.basename(body.annot)
              ),
              "file"
          )
        : console.log("no annotation file to symlink");
};

module.exports = createSymlinkComparison;
