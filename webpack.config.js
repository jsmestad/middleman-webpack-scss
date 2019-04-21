const path = require('path');
const glob = require('glob');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = (env, options) => ({
  optimization: {
    minimizer: [new UglifyJsPlugin({ cache: true, parallel: true, sourceMap: false }), new OptimizeCSSAssetsPlugin({})],
  },
  entry: {
    // main: './source/assets/js/app.js',
    // './assets/js/app.js': ['./assets/js/app.js'].concat(glob.sync('./vendor/**/*.js')),
    app: './assets/js/app.js',
  },
  output: {
    path: __dirname + '/.tmp/dist',
    filename: 'assets/js/[name].js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.(scss|sass|css)$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader'],
      },
    ],
  },
  plugins: [
    // new Clean(),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({ filename: 'assets/css/app.css' }),
    // new CopyWebpackPlugin([{ from: 'static/', to: '../' }]),
  ],
});
