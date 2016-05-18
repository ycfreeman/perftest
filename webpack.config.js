var LodashModuleReplacementPlugin = require('lodash-webpack-plugin')
// var webpack = require('webpack')
var path = require('path')

module.exports = {

  context: path.join(__dirname, 'src'),

  entry: {
    react: './react',
    vanilla: './vanilla'
  },

  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name]/app.js',
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: ['react-hot', 'babel']
      }
    ],
  },

  'plugins': [
    new LodashModuleReplacementPlugin
  ]
}
