const { merge } = require("webpack-merge");
const BrowserSyncPlugin = require("browser-sync-webpack-plugin");
const common = require("./webpack.common.js");

module.exports = merge(common(), {
  mode: "development",

  devtool: "source-map",

  plugins: [
    new BrowserSyncPlugin({
      host: "localhost",
      files: ["./**/*.php", "./**/*.scss"],
      port: 3000,
      // dockerとホストをつないでいるポートをproxyで指定
      proxy: {
        target: "http://localhost:8000",
      },
    }),
  ],
});
