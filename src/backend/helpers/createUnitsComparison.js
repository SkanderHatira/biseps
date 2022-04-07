const createUnitsComparison = (body, uniqueDir) => {
    const { parse } = require("json2csv");
    const fs = require("fs");
    const path = require("path");
    const fields = ["id", "control", "treatment"];
    const opts = { fields, delimiter: "\t" };
    console.log("creating comparison.tsv");
    if (body.remote) {
        try {
            const csv = parse(body.remotecomparisons, opts);
            fs.writeFileSync(
                path.join(uniqueDir, "config", "comparison.tsv"),
                csv
            );
        } catch (err) {
            console.error(err);
        }
    } else {
        try {
            const csv = parse(body.comparisons, opts);
            fs.writeFileSync(
                path.join(uniqueDir, "config", "comparison.tsv"),
                csv
            );
        } catch (err) {
            console.error(err);
        }
    }
};
module.exports = createUnitsComparison;
