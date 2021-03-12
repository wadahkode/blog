const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const serverConfig = {
  entry: { blog: "./resources/index.js" },
  target: "node",
  plugins: [
    // new CleanWebpackPlugin(['dist/*']) for < v2 versions of CleanWebpackPlugin
    new CleanWebpackPlugin(),
  ],
  performance: {
    hints: "warning",
    maxEntrypointSize: 10 * 1024 * 1024,
    maxAssetSize: 10 * 1024 * 1024,
  },
  output: {
    filename: "[name].min.js",
    path: path.resolve(__dirname, "public/js"),
    library: "Blog",
    libraryTarget: "umd",
    globalObject: "this",
  },
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
    ],
  },
};

const clientConfig = {
  entry: {
    bundle: "./functions/index.js",
  },
  target: "web",
  plugins: [
    // new CleanWebpackPlugin(['dist/*']) for < v2 versions of CleanWebpackPlugin
    new CleanWebpackPlugin(),
  ],
  output: {
    filename: "[name].min.js",
    path: path.resolve(__dirname, "public/js"),
    library: "JStore",
    libraryTarget: "umd",
    globalObject: "this",
    // hotUpdateChunkFilename: '[memories].[fullhash].hot-update.js',
  },
  performance: {
    hints: "warning",
    maxEntrypointSize: 10 * 1024 * 1024,
    maxAssetSize: 10 * 1024 * 1024,
  },
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
      {
        test: /\.scss$/i,
        loader: "sass-loader",
      },
    ],
  },
};

module.exports = [serverConfig, clientConfig];
