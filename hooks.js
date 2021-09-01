// ./hooks.js

const chmodr = require("chmodr");
const path = require("path");

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
      process.platform == "darwin" ? "biseps.app/Contents/Resources/app/.webpack/main/resources" : "resources/app/.webpack/main/resources"
    );
    const jbrowse = path.join(
      options.outputPaths[0],
      process.platform == "darwin" ? 
      "biseps.app/Contents/Resources/app/.webpack/main/backend/node_modules/" :
      "resources/app/.webpack/main/backend/node_modules/"
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
