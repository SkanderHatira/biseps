// ./hooks.js

const chmodr = require("chmodr");
const path = require("path");
const { exec } = require("child_process");

module.exports = {
  postStart: async (forgeConfig, options) => {
    const resources = path.join(__dirname, ".webpack/main/resources");
    const jbrowse = path.join(__dirname, ".webpack/main/backend/node_modules/");

    chmodr(resources, 0o777, (err) => {
      if (err) {
        console.log("Failed to execute chmod", err);
      } else {
        console.log("Successful");
      }
    });
    chmodr(jbrowse, 0o777, (err) => {
      if (err) {
        console.log("Failed to execute chmod", err);
      } else {
        console.log("Successful");
      }
    });
  },

  postPackage: async (forgeConfig, options) => {
    const resources = path.join(
      options.outputPaths[0],
      "resources/app/.webpack/main/resources"
    );
    const snakemakeYaml = path.join(
      options.outputPaths[0],
      "resources/app/.webpack/main/resources/snakeMinimal.yaml"
    );
    const jbrowse = path.join(
      options.outputPaths[0],
      "resources/app/.webpack/main/backend/node_modules/"
    );
    exec(
      `conda env create -n bisepsSnakemake -f ${snakemakeYaml}` +
        path.join(__dirname, "resources/checkConda.sh") +
        " " +
        __dirname,
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
    chmodr(resources, 0o777, (err) => {
      if (err) {
        console.log("Failed to execute chmod", err);
      } else {
        console.log("Successful");
      }
    });
    chmodr(jbrowse, 0o777, (err) => {
      if (err) {
        console.log("Failed to execute chmod", err);
      } else {
        console.log("Successful");
      }
    });
  },
};
