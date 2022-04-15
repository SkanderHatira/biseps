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
const pipeline = path.join(homedir, ".biseps", "biseps");
const bisepsHidden = path.join(homedir, ".biseps");
const bisepsConfigFile = path.join(homedir, ".biseps", "biseps.json");
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
    if (!fs.existsSync(bisepsHidden)) {
      fs.mkdirSync(bisepsHidden, { recursive: true });
    } else {
      console.log("Config folder already exists, moving on ...");
    }

    if (!fs.existsSync(pipeline)) {
      execSync(
        `git clone https://o2auth:${process.env.ACCESS_TOKEN}@forgemia.inra.fr/skander.hatira/biseps.git ${pipeline}`,
        (error, stdout, stderr) => {}
      );
    } else {
      console.log("Pipeline is already installed");
    }
  },
  postStart: async (forgeConfig, options) => {},

  postPackage: async (forgeConfig, options) => {},
};
