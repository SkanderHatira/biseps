const createSymlinkComparison = (body, uniqueDir) => {
    const { createSymlinkSync } = require("fs-extra");
    const path = require("path");
    body.comparisons.map((comparison) => {
        const controlFiles = comparison.control.split(",");
        const treatmentFiles = comparison.treatment.split(",");

        for (const file in controlFiles) {
            createSymlinkSync(
                controlFiles[file],
                path.join(uniqueDir, "data", path.basename(controlFiles[file]))
            );
        }
        for (const file in treatmentFiles) {
            createSymlinkSync(
                treatmentFiles[file],

                path.join(
                    uniqueDir,
                    "data",
                    path.basename(treatmentFiles[file])
                )
            );
        }
    });
    createSymlinkSync(
        body.genome,
        path.join(uniqueDir, "resources/genome", path.basename(body.genome))
    );
    createSymlinkSync(
        body.annot,
        path.join(uniqueDir, "resources/annotation", path.basename(body.annot))
    );
};
module.exports = createSymlinkComparison;
