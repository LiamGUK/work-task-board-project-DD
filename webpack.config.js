// webpack config file will run through node.js environment
// Will look for a module.exports object which will contain all settings for webpack
const path = require("path"); // core node.js module for getting absolute path of app

module.exports = {
  // mode instructs which environment webpack should run in - development bundles files in a development environment and doesnt save the output files to the disk but caches on the dev server running.
  mode: "development",
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
    publicPath: "/dist/",
  },
  // inline-source-map tells webpack that source maps will already be configured and included which webpack would only need to wire up and connect.
  devtool: "inline-source-map",
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
};
