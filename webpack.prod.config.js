const path = require('path')
const webpack = require('webpack')

module.exports = {
  devtool: 'source-map',

  entry: [__dirname + "/src",'bootstrap-loader', '/src' ],
  output: {
    path: '/'
  },

  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    })
  ],

module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        
        query: {
          presets: ['es2015', 'react'],
          plugins: ['transform-class-properties']
        }},
        { 
          test: /\.css$/, 
          loader: "style-loader!css-loader"
        }
      
    ]
  }
}

