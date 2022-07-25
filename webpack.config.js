const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'none',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.[chunkhash:8].js',
  },
  module: {
    rules: [
      {
        test: /\.(jsx|js)$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      }
    ]
  },
  plugins:[
    new HtmlWebpackPlugin({
        template: path.resolve(__dirname,'./public/index.html'),
        inject: 'body',
        scriptLoading: 'blocking'
    })
  ],
  devtool: 'eval-cheap-module-source-map',
  devServer:{
    port: '3001',
    hot: true,
    compress: true
  }
}