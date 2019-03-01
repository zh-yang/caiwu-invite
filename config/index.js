var path = require('path')

module.exports = {
    dev: {
        //path
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',

        //dev-server
        host: 'aaa.caiwu.cuxiao.quannengzhanggui.net',
        port: 80,
        autoOpenBrowser: false,

        devtool: 'cheap-module-eval-source-map',

        cssSourceMap: true,

        proxyTable: {
            '/ba': {
                target: 'http://caiwu.cuxiao.quannengzhanggui.net',
                changeOrigin: true,
                pathRewrite: {
                    '^/ba': ''
                }
            }
        }
    },
    build: {
        //path
        assetsRoot: path.resolve(__dirname, '../dist'),
        assetsSubDirectory: 'static',
        assetsPublicPath: '/mobile/',

        prodSourceMap: true,
        devtool: '#source-map'
    }
}