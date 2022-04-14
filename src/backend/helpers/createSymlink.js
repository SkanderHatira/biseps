const createSymlink = (body, uniqueDir) => {
    const fs = require("fs-extra");
    const path = require("path");
    body.units.map((unit) => {
        fs.symlinkSync(
            unit.fq1,
            path.join(uniqueDir, "data", path.basename(unit.fq1)),
            process.platform == "win32" ? "juncton" : "file"
        );
        fs.symlinkSync(
            unit.fq2,
            path.join(uniqueDir, "data", path.basename(unit.fq2)),
            process.platform == "win32" ? "juncton" : "file"
        );
    });
    fs.symlinkSync(
        body.genome,
        path.join(uniqueDir, "resources", "genome", path.basename(body.genome)),
        process.platform == "win32" ? "juncton" : "file"
    );
    body.customAdapters == ""
        ? ""
        : fs.symlinkSync(
              body.adapters,
              path.join(
                  uniqueDir,
                  "resources",
                  "adapters",
                  path.basename(body.adapters)
              ),
              process.platform == "win32" ? "juncton" : "file"
          );
};
module.exports = createSymlink;
