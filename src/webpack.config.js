const path = require("path");
const Dotenv = require("dotenv-webpack");

module.exports = {
  entry: "./src/provider-generator.ts",
  module: {
    rules: [
      {
        test: /\.ts(x)?$/,
        use: 'ts-loader',
      },
    ],
  },
  output: {
    filename: "provider.js",
    path: path.resolve(__dirname, "./src/provider"),
  },
  plugins: [
    new Dotenv() // Required for provider-generator.js to obtain environment variables
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  stats: {
    colors: false,
    hash: false,
    version: false,
    timings: false,
    assets: false,
    chunks: false,
    modules: false,
    reasons: false,
    children: false,
    source: false,
    errors: false,
    errorDetails: false,
    warnings: false,
    publicPath: false
  }
};
