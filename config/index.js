var path = require('path')

module.exports = {
	dev: {
		//path
		assetsSubDirectory: 'static',
		assetsPublicPath: '/',

		//dev-server
		host: 'localhost',
		port: 8080,
		autoOpenBrowser: false,

		devtool: 'cheap-module-eval-source-map',

		cssSourceMap: true
	},
	build: {
		//path
		assetsRoot: path.resolve(__dirname, '../dist'),
		assetsSubDirectory: 'static',
		assetsPublicPath: '/',

		prodSourceMap: true,
		devtool: '#source-map'
	}
}