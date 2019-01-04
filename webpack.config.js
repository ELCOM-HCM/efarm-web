const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const outputDirectory = "dist";
module.exports = {
  mode: process.env.NODE_ENV || "development",
  node: {
    fs: "empty",
    child_process: "empty"
  },
  entry: [
    //quiet=true turn off warning
    //"webpack-hot-middleware/client?reload=true&quiet=true",
    "babel-polyfill",
    path.join(__dirname, "src", "index.js")
  ],
  resolve: {
    modules: [path.resolve(__dirname, "src"), "node_modules"]
  },
  watch: true,
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendor",
          chunks: "all"
        }
      }
    }
  },
  module: {
    rules: [
      {
        // ES6 and above into normal ES5 syntax
        test: /\.(js|jsx)$/,
        // we do not want anything from node_modules to be compiled
        exclude: /node_modules/,
        use: ["babel-loader"]
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.less$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "less-loader"]
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        loader: "url-loader?limit=10000"
      },
      {
        test: /\.(png|jpg|jpeg|gif|mp3|svg)$/,
        loader: "file-loader"
      }
    ]
  },
  output: {
    path: path.join(__dirname, outputDirectory),
    publicPath: "/",
    filename: "efarm_bundle.js"
  },
  devServer: {
    contentBase: path.join(__dirname, "src"),
    // Display only errors to reduce the amount of output.
    stats: "errors-only",
    // Parse host and port from env to allow customization.
    //
    // If you use Docker, Vagrant or Cloud9, set
    // host: options.host || "0.0.0.0";
    //
    // 0.0.0.0 is available to all network devices
    // unlike default `localhost`.
    host: process.env.HOST, // Defaults to `localhost`
    port: process.env.PORT, // Defaults to 8080
    open: true, // Open the page in browser
    watchContentBase: true,
    hot: true
  },
  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: "development",
      DEBUG: true
    }),
    new CleanWebpackPlugin([outputDirectory]),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "public", "index.html"),
      favicon: path.join(__dirname, "public", "favicon.ico")
    }),
    new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin({
      filename: "styles.css"
    })
  ]
};
