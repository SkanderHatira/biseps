const createUnits = (body) => {
    const { parse } = require("json2csv");
    const fs = require("fs");
    const path = require("path");
    const fields = ["sample", "lane", "techrep", "biorep", "r1", "r2"];
    const opts = { fields };

    try {
        const csv = parse(body.units, opts);
        fs.writeFileSync(path.join(body.outdir, "config/units.tsv"), csv);
    } catch (err) {
        console.error(err);
    }
};
module.exports = createUnits;
