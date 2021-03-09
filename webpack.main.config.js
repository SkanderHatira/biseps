const CopyWebpackPlugin = require("copy-webpack-plugin");

// const PermissionsOutputPlugin = require("webpack-permissions-plugin");

const path = require("path");

module.exports = {
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.join("resources"),
          to: "resources",
          globOptions: {
            ignore: [
              "**/.test/**",
              "**/.snakemake/**",
              "**/.git/**",
              "**/database/**",
            ],
          },
        },
        { from: path.join("src/backend"), to: "backend" },
      ],
    }),
    // new PermissionsOutputPlugin({
    //   buildFolders: [
    //     {
    //       path: path.resolve(__dirname, "resources/database/mongo"),
    //       fileMode: "755",
    //       dirMode: "755",
    //     },
    //   ],
    // }),
  ],
  /**
   * This is the main entry point for your application, it's the first file
   * that runs in the main process.
   */
  entry: "./src/main.js",
  // Put your normal webpack config below here
  module: {
    rules: require("./webpack.rules"),
  },
};
