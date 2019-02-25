var utils = require('./utils')
var config = require('../config')
var path = require('path')
var baseWebpackConf = require('./webpack.base.conf')

var webpack = require('webpack')
var merge = require('webpack-merge')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var CleanWebpackPlugin = require('clean-webpack-plugin')


var aaa = merge(baseWebpackConf, {
	module: {
		rules: []
	},
	module: {
		rules: utils.styleLoaders({
			sourceMap: true,
			usePostCSS: false,
			extract: false	
		})
	},
	devtool: config.dev.devtool,
	devServer: {
		contentBase: false,
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
		// new webpack.DefinePlugin({
	 //      'process.env': require('../config/dev.env')
	 //    }),
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: 'index.html',
			inject: true
		})
	]
})

module.exports = aaa