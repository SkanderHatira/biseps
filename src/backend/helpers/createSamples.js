const createUnits = (body) => {
    const { parse } = require("json2csv");
    const fs = require("fs");
    const path = require("path");
    const fields = ["samples"];
    const opts = { fields };
    const myData = body.samples;
    try {
        const csv = parse(myData, opts);
        console.log(csv);
    } catch (err) {
        console.error(err);
    }
    console.log("hello");
};
module.exports = createUnits;
