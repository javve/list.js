const webpack = require('webpack')
const PACKAGE = require('./package.json')
const TerserPlugin = require('terser-webpack-plugin')

module.exports = {
  entry: {
    list: './src/index.js',
    'list.min': './src/index.js',
  },
  output: {
    path: __dirname + '/dist',
    filename: '[name].js',
    library: 'List',
  },
  devtool: 'cheap-module-source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
  devServer: {
    inline: true,
  },
  plugins: [],
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        include: /\.min\.js$/,
        extractComments: false,
        terserOptions: {
          format: {
            comments: /^! List.js v.*/,
          },
          mangle: true,
        },
      }),
    ],
  },
}
