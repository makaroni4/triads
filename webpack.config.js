const path = require('path');

module.exports = {
  entry: {
    "triads-explorer": "./src/js/app.js",
    "frets-explorer": "./src/js/triads_on_frets_app.js"
  },
  output: {
    path: path.join(__dirname, "dist", "js"),
    publicPath: "/dist/js/",
    filename: "[name].js"
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          "style-loader",
          "css-loader"
        ]
      }
    ]
  }
};
