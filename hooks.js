// ./hooks.js

const path = require("path");
const { execSync } = require("child_process");
const scripts = path.join(
  __dirname,
  ".webpack",
  "main",
  "resources",
  "biseps",
  "workflow",
  "scripts"
);
const resources = path.join(__dirname, ".webpack", "main", "resources");
const chmodr = require("chmodr");

module.exports = {
  // generateAssets: async (forgeConfig, options) => {
  //   execSync(
  //     `npx @jbrowse/cli  create ${path.join(
  //       __dirname,
  //       "resources",
  //       "jbrowse2"
  //     )} -f`,
  //     (error, stdout, stderr) => {
  //       if (error) {
  //         console.log(`error: ${error.message}`);
  //         return;
  //       }
  //       if (stderr) {
  //         console.log(`stderr: ${stderr}`);
  //         return;
  //       }
  //       console.log(`stdout: ${stdout}`);
  //     }
  //   );
  // },
  // no need to generate assets , not working on deployment runner
  postStart: async (forgeConfig, options) => {
    chmodr(scripts, 0o777, (err) => {
      if (err) {
        console.log("Failed to execute chmod", err);
      } else {
        console.log("Successful");
      }
    });
    chmodr(resources, 0o777, (err) => {
      if (err) {
        console.log("Failed to execute chmod", err);
      } else {
        console.log("Successful");
      }
    });
  },

  postPackage: async (forgeConfig, options) => {
    const resources =
      process.platform == "darwin"
        ? path.join(
            options.outputPaths[0],
            "biseps.app/Contents/Resources/app/.webpack/main/resources/"
          )
        : path.join(
            options.outputPaths[0],
            "resources/app/.webpack/main/resources/"
          );

    chmodr(resources, 0o777, (err) => {
      if (err) {
        console.log("Failed to execute chmod", err);
      } else {
        console.log("Successful");
      }
    });
  },
};
