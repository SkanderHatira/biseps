const createSymlink = (body, uniqueDir) => {
    const fs = require("fs");
    const path = require("path");
    body.units.map((unit) => {
        fs.symlink(
            unit.fq1,
            path.join(uniqueDir, "data", path.basename(unit.fq1)),
            "file"
        );
        fs.symlink(
            unit.fq2,
            path.join(uniqueDir, "data", path.basename(unit.fq2)),
            "file"
        );
    });
    fs.symlink(
        body.genome,
        path.join(uniqueDir, "resources", "genome", path.basename(body.genome)),
        "file"
    );
    body.customAdapters == ""
        ? ""
        : fs.symlink(
              body.adapters,
              path.join(
                  uniqueDir,
                  "resources",
                  "adapters",
                  path.basename(body.adapters)
              ),
              "file"
          );
};
module.exports = createSymlink;
