const webpack = require('webpack');

module.exports = {
  entry: './src/js/main.js',
  output: {
    path: './build',
    publicPath: '/build/',
    filename: 'bundle.js'
  },
  module: {
    // avoid webpack trying to shim process
    noParse: /es6-promise\.js$/,
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue'
      }, {
        test: /\.js$/,
        // excluding some local linked packages.
        // for normal use cases only node_modules is needed.
        exclude: /node_modules/,
        loader: 'babel'
      }, {
        test: /\.css$/,
        loader: 'style!css',
      }
    ]
  },
  babel: {
    presets: ['es2015'],
    plugins: ['transform-runtime']
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
    })
  ]
}

if (process.env.NODE_ENV === 'production') {
  module.exports.plugins = [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.optimize.OccurenceOrderPlugin()
  ]
} else {
  module.exports.devtool = '#source-map'
}
