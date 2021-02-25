const fs = require("fs");
let rawdata = fs.readFileSync("multiqc_data.json");
let student = JSON.parse(rawdata);
console.log(student);
