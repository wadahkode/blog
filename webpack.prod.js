const { merge } = require("webpack-merge");
const [serverCommon, clientCommon] = require("./webpack.common.js");

const serverMerge = merge(serverCommon, {
  mode: "production",
  devtool: "source-map",
  plugins: [],
});

const clientMerge = merge(clientCommon, {
  mode: "production",
  devtool: "source-map",
  plugins: [],
});

module.exports = [serverMerge, clientMerge];
