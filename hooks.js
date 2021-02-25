// ./hooks.js

const chmodr = require("chmodr");
const path = require("path");

module.exports = {
  postStart: async (forgeConfig, options) => {
    const resources = path.join(__dirname, ".webpack/main/resources");

    chmodr(resources, 0o777, (err) => {
      if (err) {
        console.log("Failed to execute chmod", err);
      } else {
        console.log("Success");
      }
    });
  },

  postPackage: async (forgeConfig, options) => {
    const resources = path.join(
      options.outputPaths[0],
      "resources/app/.webpack/main/resources"
    );

    chmodr(resources, 0o777, (err) => {
      if (err) {
        console.log("Failed to execute chmod", err);
      } else {
        console.log("Success");
      }
    });
  },
};
