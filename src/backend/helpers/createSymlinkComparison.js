const createSymlinkComparison = (body, uniqueDir) => {
    const fs = require("fs-extra");
    const path = require("path");
    async function ensuresymlink(src, dest) {
        try {
            await fs.ensureSymlink(src, dest, "file");
            console.log("success!");
        } catch (err) {
            console.error(err);
        }
    }
    if (!fs.existsSync(path.join(uniqueDir, "data"))) {
        fs.mkdirSync(path.join(uniqueDir, "data"), { recursive: true });
    }
    if (!fs.existsSync(path.join(uniqueDir, "resources", "genome"))) {
        fs.mkdirSync(path.join(uniqueDir, "resources", "genome"), {
            recursive: true,
        });
    }
    if (!fs.existsSync(path.join(uniqueDir, "resources", "annotation"))) {
        fs.mkdirSync(path.join(uniqueDir, "resources", "annotation"), {
            recursive: true,
        });
    }
    body.comparisons.map(async (comparison) => {
        const controlFiles = comparison.control.split(",");
        const treatmentFiles = comparison.treatment.split(",");

        for (const file in controlFiles) {
            ensuresymlink(
                controlFiles[file],
                path.join(uniqueDir, "data", path.basename(controlFiles[file]))
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
    ensuresymlink(
        body.genome,
        path.join(uniqueDir, "resources", "genome", path.basename(body.genome))
    );

    body.annot !== ""
        ? ensuresymlink(
              body.annot,
              path.join(
                  uniqueDir,
                  "resources",
                  "annotation",
                  path.basename(body.annot)
              )
          )
        : console.log("no annotation file to symlink");
};

module.exports = createSymlinkComparison;
