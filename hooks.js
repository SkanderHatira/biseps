// ./hooks.js

const path = require("path");
const { execSync } = require("child_process");
const fs = require("fs");
const homedir = require("os").homedir();
const resources = path.join(__dirname, "resources");

require("dotenv").config({ path: path.join(__dirname, "src/backend/.env") });
module.exports = {
  generateAssets: async (forgeConfig, options) => {
    fs.access(path.join(resources, "jbrowse2"), function (error) {
      if (error) {
        execSync(
          `npx  @jbrowse/cli  create ${path.join(resources, "jbrowse2")} -f`,
          (error, stdout, stderr) => {
            if (error) {
              console.log(`error: ${error.message}`);
              return;
            }
            if (stderr) {
              console.log(`stderr: ${stderr}`);
              return;
            }
            console.log(`stdout: ${stdout}`);
          }
        );
      } else {
        console.log("Jbrowse present, moving on...");
      }
    });
  },
  postStart: async (forgeConfig, options) => {},

  postPackage: async (forgeConfig, options) => {},
};
