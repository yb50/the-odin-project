const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./src/script.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  devtool: "eval-source-map",

  // ----- CHECK LATER FOR OWN PROJCETS -----
  devServer: {
    hot: true, // enable HMR for JS/CSS
    liveReload: true, // fall back to full reload if HMR isn’t handled
    watchFiles: ["src/**/*"], // watch HTML, CSS, JS in src
    open: true, // optional: auto-open browser
    client: { overlay: true }, // optional: show build errors as an overlay
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
  ],
  module: {
    rules: [
      { test: /\.css$/i, use: ["style-loader", "css-loader"] },
    ],
  },
};
