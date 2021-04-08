const rules = require("./webpack.rules");
const path = require("path");

rules.push({
  test: /\.css$/,
  use: [{ loader: "style-loader" }, { loader: "css-loader" }],
});
rules.push({
  test: /\.scss$/,
  use: [{ loader: "style-loader" }, { loader: "scss-loader" }],
});
rules.push({
  test: /\.(js|jsx)$/,
  include: path.resolve(__dirname, "src"),
  use: [
    {
      loader: "babel-loader",
      options: {
        presets: ["@babel/preset-env", "@babel/preset-react"],
      },
    },
  ],
});
rules.push({
  test: /\.(png|jp(e*)g|svg|gif)$/,
  use: [
    {
      loader: "file-loader",
    },
  ],
});
module.exports = {
  // Put your normal webpack config below here
  devServer: {
    inline: true,
    port: 3000,
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        query: {
          presets: ["es2015", "react"],
        },
      },
    ],
  },

  module: {
    rules,
  },
};
