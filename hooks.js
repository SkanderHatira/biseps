// ./hooks.js

const path = require("path");
const { execSync, fork } = require("child_process");
const fs = require("fs");
const homedir = require("os").homedir();
const jbpath = path.join(homedir, ".biseps", "jbrowse2");
const jbrowse = path.join(
  __dirname,
  "node_modules",
  "@jbrowse",
  "cli",
  "bin",
  "run"
);
require("dotenv").config({ path: path.join(__dirname, "src/backend/.env") });
module.exports = {
  generateAssets: async (forgeConfig, options) => {
    fs.access(jbpath, function (error) {
      if (error) {
        try {
          fork(jbrowse, ["create", "--nightly", jbpath]);
        } catch (err) {
          console.log(err);
        }
      } else {
        console.log("Jbrowse present, moving on...");
      }
    });
    // fs.access(jbpath, function (error) {
    //   if (error) {
    //     execSync(
    //       `npx @jbrowse/cli  create ${jbpath} -f`,
    //       (error, stdout, stderr) => {
    //         if (error) {
    //           console.log(`error: ${error.message}`);
    //           return;
    //         }
    //         if (stderr) {
    //           console.log(`stderr: ${stderr}`);
    //           return;
    //         }
    //         console.log(`stdout: ${stdout}`);
    //       }
    //     );
    //   } else {
    //     console.log("Jbrowse present, moving on...");
    //   }
    // });
  },
};
