const path = require('path');
const webpack = require('webpack');

// const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const paths = {
  app: path.resolve(__dirname, 'src/'),
  styles: path.resolve(__dirname, '/src/assets/styles'),
  build: path.resolve(__dirname, 'build/'),
  template: path.resolve(__dirname, './public/index.html'),
};

const env = process.env.NODE_ENV || 'development';

module.exports = {
  entry: {
    app: path.join(paths.app, 'index.js')
  },
  output: {
    filename: 'js/[name]-generated.js',
    path: paths.build,
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env', 'es2015', 'react']
          }
        }
      },
      {
        test: /\.scss$/,
        use: ExtractTextWebpackPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader?!sass-loader'
        })
      }
    ]
  },
  plugins: [
    new ExtractTextWebpackPlugin('css/app-generated.css'),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: paths.template,
      inject: true
    })
  ],
  devtool: env === 'production' ? 'cheap-source-map' : 'eval-source-map',
  devServer: {
    contentBase: paths.build,
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000,
      ignored: /node_modules/
    },
    proxy: {
      "/api": "http://0.0.0.0:3000"
    }
  }
};
