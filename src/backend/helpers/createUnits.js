const createUnits = (body) => {
    const { parse } = require("json2csv");
    const fs = require("fs");
    const path = require("path");
    const fields = ["sample", "lane", "techrep", "biorep", "r1", "r2"];
    const opts = { fields };
    body.sampleState.forEach((element) => {
        let data = [];

        element.units.forEach((unit, idx) => {
            // console.log(unit);
            // for (const i = 1; i <= N; i++) {
            //     lanes.push(i);
            // }
            for (const i = 1; i <= unit.r1.length; i++) {
                const entry = {
                    sample: element.sample,
                    techrep: 1,
                    lane: i,
                    biorep: idx,
                    r1: unit.r1[i],
                    r2: unit.r2[i] || "",
                };
                console.log(entry);
            }
        });
    });

    // try {
    //     const csv = parse(body.sampleState, opts);
    //     console.log(csv);
    // } catch (err) {
    //     console.error(err);
    // }
};
module.exports = createUnits;
