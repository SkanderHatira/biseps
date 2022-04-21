const createSymlinkComparison = (body, uniqueDir) => {
    const fs = require("fs");
    const path = require("path");
    body.comparisons.map((comparison) => {
        const controlFiles = comparison.control.split(",");
        const treatmentFiles = comparison.treatment.split(",");

        for (const file in controlFiles) {
            fs.symlink(
                controlFiles[file],
                path.join(uniqueDir, "data", path.basename(controlFiles[file])),
                "file"
            );
        }
        for (const file in treatmentFiles) {
            fs.symlink(
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
    fs.symlink(
        body.genome,
        path.join(uniqueDir, "resources", "genome", path.basename(body.genome)),
        "file"
    );
    body.annot !== ""
        ? fs.symlink(
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
