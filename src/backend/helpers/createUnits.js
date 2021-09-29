const createUnits = (body, uniqueDir) => {
    const { parse } = require("json2csv");
    const fs = require("fs");
    const path = require("path");
    const fields = ["sample", "lane", "techrep", "biorep", "fq1", "fq2"];
    const opts = { fields, delimiter: "\t" };
    console.log("creating units");
    if (body.remote) {
        try {
            const csv = parse(body.remoteunits, opts);
            fs.writeFileSync(path.join(uniqueDir, "config/units.tsv"), csv);
        } catch (err) {
            console.error(err);
        }
    } else {
        try {
            const csv = parse(body.units, opts);
            fs.writeFileSync(path.join(uniqueDir, "config/units.tsv"), csv);
        } catch (err) {
            console.error(err);
        }
    }
};
module.exports = createUnits;
