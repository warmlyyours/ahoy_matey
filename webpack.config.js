const webpack = require('webpack');
const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  entry: {
    'ahoy': './src/ahoy.js'
  },
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [
          /node_modules/
        ],
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true
          }
        }
      }
    ]
  },
  resolve: {
    extensions: ['.js'],
    modules: [
      path.resolve(__dirname, '.'),
      'node_modules'
    ],
  },
  plugins: [
    new webpack.optimize.ModuleConcatenationPlugin(),
    new UglifyJsPlugin({
      sourceMap: true,
      cache: true,
      parallel: true
    })
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    library: 'ahoy',
    libraryExport: 'default',
    libraryTarget: 'umd'
  },
  // devtool: 'source-map',
  stats: {
    context: path.resolve(__dirname, '.'),
  },
  performance: {
    hints: 'warning'
  },
};
