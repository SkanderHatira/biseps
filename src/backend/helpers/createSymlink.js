const createSymlink = (body, uniqueDir) => {
    const { createSymlinkSync } = require("fs-extra");
    const path = require("path");
    body.units.map((unit) => {
        createSymlinkSync(
            unit.fq1,
            path.join(uniqueDir, "data", path.basename(unit.fq1))
        );
        createSymlinkSync(
            unit.fq2,
            path.join(uniqueDir, "data", path.basename(unit.fq2))
        );
    });
    createSymlinkSync(
        body.genome,
        path.join(uniqueDir, "resources/genome", path.basename(body.genome))
    );
    body.remote && body.customAdapters != ""
        ? ""
        : createSymlinkSync(
              body.adapters,
              path.join(
                  uniqueDir,
                  "resources/adapters",
                  path.basename(body.adapters)
              )
          );
};
module.exports = createSymlink;
