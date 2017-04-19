var webpack = require('webpack')
var webpackConfig = require('./base')

webpackConfig.plugins.push(
    new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: '"development"'
        }
    })
)

var backEndServer = 'http://192.168.214.188'

webpackConfig.devtool = '#cheap-source-map'
webpackConfig.devServer = {
    contentBase: './dist',
    proxy: [
        {
            context: "/ocm-analysis/*",
            target: backEndServer,
            changeOrigin: true
        }
    ]
}

module.exports = webpackConfig
