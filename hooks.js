// ./hooks.js

const path = require("path");
const { execSync } = require("child_process");
const fs = require("fs");
const homedir = require("os").homedir();
const resources = path.join(__dirname, "resources");
const jsonContent = JSON.stringify(
  { database: "", port: "", conda: "" },
  null,
  2
);
const bisepsHidden = path.join(homedir, ".biseps");
const bisepsConfigFile = path.join(homedir, ".biseps", "biseps.json");
module.exports = {
  generateAssets: async (forgeConfig, options) => {
    fs.access(path.join(resources, "jbrowse2"), function (error) {
      if (error) {
        execSync(
          `npx -y @jbrowse/cli  create ${path.join(resources, "jbrowse2")} -f`,
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
    if (!fs.existsSync(bisepsConfigFile)) {
      fs.mkdirSync(bisepsHidden, { recursive: true });
      fs.writeFileSync(bisepsConfigFile, jsonContent);
    } else {
      console.log("Config file already exists, moving on ...");
    }
  },
  postStart: async (forgeConfig, options) => {},

  postPackage: async (forgeConfig, options) => {},
};
