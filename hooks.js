// ./hooks.js

const path = require("path");
const { exec } = require("child_process");
const fs = require("fs");

module.exports = {
  generateAssets: async (forgeConfig, options) => {
    exec(
      `jbrowse create ${__dirname}/resources/jbrowse2 -f || true`,
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
  },
  postStart: async (forgeConfig, options) => {
    // chmodr(resources, 0o777, (err) => {
    //   if (err) {
    //     console.log("Failed to execute chmod", err);
    //   } else {
    //     console.log("Successful");
    //   }
    // });
    // chmodr(jbrowse, 0o777, (err) => {
    //   if (err) {
    //     console.log("Failed to execute chmod", err);
    //   } else {
    //     console.log("Successful");
    //   }
    // });
  },

  postPackage: async (forgeConfig, options) => {
    // const resources = path.join(
    //   options.outputPaths[0],
    //   "resources/app/.webpack/main/resources"
    // );
    // const jbrowse = path.join(
    //   options.outputPaths[0],
    //   "resources/app/.webpack/main/backend/node_modules/"
    // );
    // chmodr(resources, 0o777, (err) => {
    //   if (err) {
    //     console.log("Failed to execute chmod", err);
    //   } else {
    //     console.log("Successful");
    //   }
    // });
    // chmodr(jbrowse, 0o777, (err) => {
    //   if (err) {
    //     console.log("Failed to execute chmod", err);
    //   } else {
    //     console.log("Successful");
    //   }
    // });
  },
};
