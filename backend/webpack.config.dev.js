import webpack from 'webpack'
import path from 'path'

//var webpack = require('webpack');
//var path = require('path');
const PATHS = {
  index: path.join(__dirname, '../frontend/src/index'),
  build: path.join(__dirname, '../frontend/dist'),
  base: path.join(__dirname, '../frontend/src'),
};
export default {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'webpack-hot-middleware/client?reload=true',
    PATHS.index
  ],
  output: {
    path: PATHS.build,
    publicPath: '/',
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ],

  module: {
    rules: [{
      test: /\.jsx?$/,
      loader: 'babel-loader',
      exclude: /(node_modules)/,
      include: PATHS.base,
      query: {
        plugins: ['transform-runtime'],
        presets: ['es2015', 'stage-0', 'react']
      },
      resolve: {
        extensions: [' ', '.ts', '.tsx', '.js'] // <-- Had to add the .js one
      },
    },
    {
      test: /(\.css)$/,
      loaders: ['style-loader', 'css-loader']
    },
    {
      test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'url-loader?limit=10000&mimetype=image/svg+xml'
    },
    {
      test: /\.(gif|png|jpe?g|svg)$/i,
      use: [
        'file-loader',
        {
          loader: 'image-webpack-loader',
          options: {
            bypassOnDebug: true, // webpack@1.x
            disable: true, // webpack@2.x and newer
          },
        },
      ]
    }]
  }
};
