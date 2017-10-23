const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

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
      },
      {
        test: /\.html$/,
        use: ['html-loader']
      },
      {
        test: /\.(jpg|png)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: "[name].[ext]",
              outputPath: "img/",
              publicPath: "img/"
            }
          }
        ]
      }
    ]
  },
  plugins: [
    extractPlugin,
    new HtmlWebpackPlugin({
      filename: "index.html",
      chunks: ["triads-explorer"],
      template: "src/index.html"
    }),
    new HtmlWebpackPlugin({
      filename: "frets.html",
      chunks: ["frets-explorer"],
      template: 'src/frets.html'
    }),
    new CleanWebpackPlugin(["dist"])
  ]
};
