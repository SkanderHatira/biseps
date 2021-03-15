// ./hooks.js

const chmodr = require("chmodr");
const path = require("path");
const { exec } = require("child_process");
// const server = require(path.join(__dirname, "../backend/spawnServer.js"));

module.exports = {
  // postStart: async (forgeConfig, options) => {
  //   const resources = path.join(
  //     __dirname,
  //     ".webpack/main/resources/linux/snakemake"
  //   );

  //   chmodr(resources, 0o777, (err) => {
  //     if (err) {
  //       console.log("Failed to execute chmod", err);
  //     } else {
  //       console.log("Success");
  //     }
  //   });
  // },
  // postStart: async (forgeConfig, options) => {
  //   const server = exec(
  //     path.join(__dirname, "resources/server/linux/server-linux")
  //   );
  //   server();
  // },
  // postStart: async (forgeConfig, options) => {
  //   server();
  // },
  postPackage: async (forgeConfig, options) => {
    const resources = path.join(
      options.outputPaths[0],
      "resources/app/.webpack/main/resources/snakemake"
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
