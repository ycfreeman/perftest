var path = require('path')

module.exports = {

  context: path.join(__dirname, 'src'),

  entry: {
    react: './react',
    vanilla: './vanilla',
    vanillaSmart: './vanillaSmart',
    'ios/reduxTest/js': './ios'
  },

  output: {
    path: path.resolve(__dirname, 'demo'),
    filename: '[name]/app.js',
  },

  module: {
    loaders: [
      // { test: /\.jsx?$/, exclude: /node_modules/, loaders: ['react-hot', 'babel'] }
      { test: /\.jsx?$/, exclude: /node_modules/, loaders: ['babel'] }
    ],
  }
}
