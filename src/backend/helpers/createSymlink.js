const createSymlink = (body, uniqueDir) => {
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

    body.units.map((unit) => {
        ensuresymlink(
            unit.fq1,
            path.join(uniqueDir, "data", path.basename(unit.fq1))
        );
        ensuresymlink(
            unit.fq2,
            path.join(uniqueDir, "data", path.basename(unit.fq2))
        );
    });
    ensuresymlink(
        body.genome,
        path.join(uniqueDir, "resources", "genome", path.basename(body.genome))
    );
    body.customAdapters == ""
        ? ""
        : ensuresymlink(
              body.adapters,
              path.join(
                  uniqueDir,
                  "resources",
                  "adapters",
                  path.basename(body.adapters)
              )
          );
};
module.exports = createSymlink;
