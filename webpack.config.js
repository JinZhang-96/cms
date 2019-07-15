/** 静态资源的打包配置 */
const webpack = require('webpack');
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const htmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const autoprefixer = require('autoprefixer');
const cssLoader = require('css-loader');
const styleLoader = require('style-loader');
const postcssLoader = require('postcss-loader');
const sassLoader = require('sass-loader');
// const extractSCSS = new ExtractTextPlugin('stylesheets/[name]-two.css');


module.exports = {
  entry: {
    main: ['webpack/hot/poll?100'],
    index: ['./static/js/index.js'],
    style: ['./static/styles.scss']
  },
  watch: true,
  target: 'web',
  externals: [
    nodeExternals({
      whitelist: ['webpack/hot/poll?100', /\.(?!(?:jsx?|json)$).{1,5}$/i],
    }),
  ],
  module: {
    rules: [
      // {
      //   test: /.tsx?$/,
      //   use: 'ts-loader',
      //   exclude: /node_modules/,
      // },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
        include: [path.resolve(__dirname, "static/styles.scss")
      ],
      }
    ],
  },
  mode: 'development',
  resolve: {
    extensions: ['.tsx', '.ts', '.js', 'html', 'css', 'scss', 'jpg'],
    modules: [
      "./node_modules"
    ],
    symlinks: true,
    mainFields: [
      "browser",
      "module",
      "main"
    ]
  },
  plugins: [
    new CleanWebpackPlugin({
      root: path.resolve(__dirname, ''),     //根目录
      verbose: true,                         //是否启用控制台输出信息
      dry: false,                            //设置为false,启用删除文件
      cleanAfterEveryBuildPatterns: ['dist']
    }),
    new webpack.HotModuleReplacementPlugin(),
    new htmlWebpackPlugin({
      template: path.join(__dirname, 'static/assets/views/index.html')
    })
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].bundle.js',
    chunkFilename: "[id].chunk.js",
    crossOriginLoading: false
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 9000,
    host: '127.0.0.1',
    hot: true,
    hotOnly: true,
    index: 'index.html',
    open: true,
    watchOptions: {
      poll: true
    }
  }
};