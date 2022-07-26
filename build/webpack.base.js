const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const rootDir = process.cwd();

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'bundle.[chunkhash:8].js',
    clean: true,
    assetModuleFilename: 'images/[hash][ext][query]'  //定义资源输出的文件名
  },
  module: {
    rules: [
      {
        oneOf:
        [
          {
            test: /\.(jsx|js)$/,
            use: 'babel-loader',
            exclude: /node_modules/,
          },
          {
            test: /\.less$/i,
            use:[
              MiniCssExtractPlugin.loader,
              'css-loader', 
              'less-loader',
              {
                loader:'postcss-loader',
                options:{
                  postcssOptions:{
                    plugins:[['autoprefixer']]
                  }
                }
              }
            ], 
            exclude: /node_modules/
          },
          {
            test: /\.(png|jpg|gif|jpeg|webp|svg|ttf|woff|woff2)$/,
            type: 'asset' //webpack5新功能代替 file-loader, url-loader, raw-loader
          }
        ] 
      }
    ]    
  },
  plugins:[
    
    new HtmlWebpackPlugin({
        template: path.resolve(__dirname,'../public/index.html'),
        inject: 'body',
        scriptLoading: 'blocking'
    }),
    //将css提取到单独的文件
    new MiniCssExtractPlugin({
      filename: 'css/[name].css'
    }),
    //将public文件夹中的静态资源复制到输出目录中
    new CopyWebpackPlugin({
      patterns:[
        {
          from: '*.js',
          context: path.resolve(rootDir, 'public/js'),
          to: path.resolve(rootDir, 'dist/js')
        }
      ]
    })
  ],
  optimization:{
    minimizer:[
      `...`, //webpack5默认的压缩
      new CssMinimizerWebpackPlugin()  //压缩css文件
    ]
  }
}