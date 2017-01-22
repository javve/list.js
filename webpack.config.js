const webpack = require('webpack'),
      PACKAGE = require('./package.json');

module.exports = {
  entry: {
    list: './src/index.js',
    "list.min": './src/index.js'
  },
  output: {
    path: __dirname + '/dist',
    filename: "[name].js",
    library: 'List'
  },
  module: {
    rules: [{
      enforce: 'pre',
      test: /\.js$/,
      exclude: /(node_modules|src\/utils\/extend\.js)/,
      loader: "jshint-loader"
    }]
  },
  devServer: {
    inline: true
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      include: /\.min\.js$/,
      minimize: true
    }),
    new webpack.BannerPlugin({
      banner: 'List.js v' + PACKAGE.version + ' (' + PACKAGE.homepage + ') by ' + PACKAGE.author.name + ' (' + PACKAGE.author.url + ')'
    })
  ]
};
