var utils = require('./utils')
var config = require('../config')
var path = require('path')
var baseWebpackConf = require('./webpack.base.conf')

var webpack = require('webpack')
var merge = require('webpack-merge')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var CleanWebpackPlugin = require('clean-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = merge(baseWebpackConf, {
    module: {
        rules: []
    },
    module: {
        rules: utils.styleLoaders({
            sourceMap: true,
            usePostCSS: false,
            extract: true
        })
    },
    devtool: config.dev.devtool,
    devServer: {
        contentBase: false,
        hot: true,
        host: config.dev.host,
        port: config.dev.port,
        compress: true,
        open: config.dev.autoOpenBrowser,
        historyApiFallback: {
            rewrites: [
                { from: /.*/, to: path.posix.join('/', 'index.html') }
            ]
        }
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': require('../config/dev.env')
        }),
        new ExtractTextPlugin({
            filename: utils.assetsPath('css/[name].[contenthash].css'),
            allChunks: true,
        }),
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            inject: true
        })
    ]
})