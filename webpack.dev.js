const { merge } = require("webpack-merge");
const [serverCommon, clientCommon] = require("./webpack.common");

const serverMerge = merge(serverCommon, {
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    contentBase: "./public/js",
  },
});

const clientMerge = merge(clientCommon, {
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    contentBase: "./public/js",
  },
});

module.exports = [serverMerge, clientMerge];
