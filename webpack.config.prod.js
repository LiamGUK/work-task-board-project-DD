// webpack config file will run through node.js environment
// Will look for a module.exports object which will contain all settings for webpack
const path = require("path"); // core node.js module for getting absolute path of app
const CleanPlugin = require("clean-webpack-plugin");

module.exports = {
  mode: "production",
  // Needs to know entry point file for app (main file containing base logic)
  entry: "./src/app.ts",
  devServer: {
    static: [
      {
        directory: path.join(__dirname),
      },
    ],
  },
  // output key is for info on how webpack should create the output file for bundled js files
  output: {
    // filename will be name of file created by webpack - add contenthash if wanting to include dynamic value on file name for each new file creation.
    // filename: "bundle.[contenthash].js",
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  // inline-source-map tells webpack that source maps will already be configured and included which webpack would only need to wire up and connect.
  // devtool: "none",
  // module tells webpack how to deal with all the files it finds within the app.
  module: {
    rules: [
      {
        // pass in object to rules instruct webpack what to do with certain files - pass in test property with regex to instruct webpack to complete action on all files that end with .ts extension.
        test: /\.ts$/,
        use: "ts-loader", // all .ts files should use the ts-loader package
        exclude: /node_modules/,
      },
    ],
  },
  // resolve property tells ts what do with files which will complete actions for files specifically with .ts or .js file extensions.
  resolve: {
    extensions: [".ts", ".js"],
  },
  // ClearPlugin plugin will auto remove all existing files in the output path folder which will then be replaced with the files outputted from production mode process.
  plugins: [new CleanPlugin.CleanWebpackPlugin()],
};
