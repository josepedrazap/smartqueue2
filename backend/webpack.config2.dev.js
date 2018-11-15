const path = require('path');

module.exports = {
  entry: '../frontend/src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
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
  }
};
