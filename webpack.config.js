const path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var webpack = require('webpack');

var isProd = process.env.NODE_ENV === 'production';

// Create css rule based on production
var cssProd = ExtractTextPlugin.extract({
  fallback: "style-loader",
  use: "css-loader"
});

var cssDev = ['style-loader', 'css-loader'];

module.exports = {
  entry: './src/app.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'app.bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: isProd ? cssProd : cssDev
      }, {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'KE-chain 3',
      filename: 'index.html',
      template: './src/index.ejs',
      hash: true,
      minify: {
        collapseWhitespace: true,
      }
    }),
    new ExtractTextPlugin({
      filename: 'app.bundle.css',
      allChunks: true,
      disable: !isProd
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
  ],
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 9000,
    stats: 'errors-only',
    open: true,
    hot: true
  }
}