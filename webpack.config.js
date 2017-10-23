const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractPlugin = new ExtractTextPlugin({
  filename: 'app.css'
});

module.exports = {
  entry: {
    "triads-explorer": "./src/js/app.js",
    "frets-explorer": "./src/js/triads_on_frets_app.js"
  },
  output: {
    path: path.join(__dirname, "dist"),
    publicPath: "/dist",
    filename: "[name].js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
                presets: ['es2015']
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        use: extractPlugin.extract({
            use: [
              'css-loader',
              'sass-loader'
            ]
        })
      }
    ]
  },
  plugins: [
    extractPlugin
  ]
};
