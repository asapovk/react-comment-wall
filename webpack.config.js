var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'public/javascripts');
var APP_DIR = path.resolve(__dirname,'src');

module.exports = {
  entry: APP_DIR+'/client-entry.jsx',

  output: {
    filename: 'bundle.js',
    path: BUILD_DIR
  },

  debug: true,
  devtool: 'source-map',
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        include : APP_DIR,
        loader: 'babel-loader',
        query: {
        presets: ['es2015', 'react']
        }
      }
    ]
  }
};
