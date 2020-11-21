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
  devtool: false,
  module: {},
  devServer: {
    inline: true,
  },
  plugins: [
    new webpack.BannerPlugin({
      banner:
        'List.js v' +
        PACKAGE.version +
        ' (' +
        PACKAGE.homepage +
        ') by ' +
        PACKAGE.author.name +
        ' (' +
        PACKAGE.author.url +
        ')',
    }),
  ],
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
