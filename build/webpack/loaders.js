var path = require('path')
var ExtractTextPlugin = require("extract-text-webpack-plugin")
var StringReplacePlugin = require("string-replace-webpack-plugin")
var moment = require('moment')

var mode = process.env.NODE_ENV
var lessLoader

if (mode === 'production') {
    lessLoader = ExtractTextPlugin.extract('css!less')
} else {
    lessLoader = 'style!css!less'
}

module.exports = [
    {
        test: /\.js$/,
        include: [
            path.resolve(__dirname, '../../node_modules/vue-strap/src'),
            path.resolve(__dirname, '../../src'),
            path.resolve(__dirname, '../../node_modules/vue-calendar/src'),
        ],
        loader: 'babel'
    },
    {
        test: /\.(less|css)$/,
        loader: lessLoader
    },
    {
        test: /\.vue$/,
        loader: 'vue'
    },
    {
        test: /.*\.(gif|png|jpe?g|svg)$/i,
        loader: 'url'
    },
    {
        test: /\.(woff|woff2)$/,
        loader: "url-loader?limit=10000&mimetype=application/font-woff"
    },
    {
        test: /\.ttf$|\.eot$|\.svg$/,
        loader: "file-loader"
    },
    {
        test: /index.js/,
        loader: StringReplacePlugin.replace({
            replacements: [{
                pattern: /BUILDVERSION_PLACEHOLDER/ig,
                replacement: function (match, p1, offset, string) {
                    return moment().format('YYYY-MM-DD HH:mm')
                }
            }]
        })
    }
]
