var path = require('path')

var CleanWebpackPlugin = require('clean-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var { VueLoaderPlugin } = require('vue-loader')

module.exports = {
	entry: {
		main: './src/main.js'
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].js'
	},
	resolve: {
		extensions: ['.js', '.vue', '.json'],
		alias: {
			'vue$': 'vue/dist/vue.esm.js',
			'@': path.resolve(__dirname, 'src')
		}
	},
	module: {
		rules: [
			{
				test: /\.vue$/,
				use: 'vue-loader'
			}
		]
	},
	plugins: [
		new CleanWebpackPlugin('dist'),
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: 'index.html'
		}),
		// new VueLoaderPlugin()
	],
	devServer: {
		contentBase: false,
		host: 'localhost',
		port: 8080,
		compress: true,
		open: false,
		historyApiFallback: {
      		rewrites: [
        		{ from: /.*/, to: path.posix.join('/', 'index.html') }
      		]
    	}
	}
}