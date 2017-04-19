var webpack = require('webpack')
var webpackConfig = require('./base')
var ExtractTextPlugin = require("extract-text-webpack-plugin")

webpackConfig.plugins.push(
    new ExtractTextPlugin('[name].[hash:5].min.css'),
    new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false
        }
    }),
    new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: '"production"'
        }
    })
)

webpackConfig.output.filename = '[name].[hash:5].min.js'
webpackConfig.vue = {
    loaders: {
        less: ExtractTextPlugin.extract('css!less')
    }
}

module.exports = webpackConfig

