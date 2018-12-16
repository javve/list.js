const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const PACKAGE = require('./package.json');

module.exports = {
  entry: {
    list: './src/index.js',
    'list.min': './src/index.js',
  },
  output: {
    path: `${__dirname}/dist`,
    filename: '[name].js',
    library: 'List',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        enforce: 'pre',
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      },
    ],
  },
  devServer: {
    inline: true,
    compress: true,
  },
  devtool: 'cheap-module-source-map',
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        include: /\.min\.js$/,
        sourceMap: true,
      }),
    ],
  },
  plugins: [
    new webpack.BannerPlugin({
      banner: `List.js v${PACKAGE.version} (${PACKAGE.homepage}) by ${
        PACKAGE.author.name
      } (${PACKAGE.author.url})`,
    }),
  ],
};
