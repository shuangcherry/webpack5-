const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.base.js');


module.exports = merge(baseConfig, {
    mode: 'development',
    devtool: 'eval-source-map',
    devServer: {
        port: '3001',
        compress: true,
        proxy:{

        },
        hot: true
    },
    cache: {
        type: 'memory'
    }
})