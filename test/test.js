// var webpack = require('webpack')
var fs = require("fs");
var config =require("./config")
console.log(config.type)
// var str = fs.readFileSync('./test.txt', {
//     encoding: 'utf-8'
// });
// var test =JSON.stringify(str);
// var a ="[type]wm"
//  // test =test.replace(/\\r\\n/,"").replace(/"/g,"").match(/(?:\[[A-Za-z0-9]*\]=?).*/);
// test =test.replace(/\\r\\n/,"").replace(/"/g,"");
// var reg =/(?:\[[A-Za-z0-9]*\]=?)(.*)/
// var tt=reg.exec(test);
// console.log(tt);
// var webpackConfig = require('./base')
// var ExtractTextPlugin = require("extract-text-webpack-plugin")
//
// webpackConfig.plugins.push(
//     new ExtractTextPlugin('[name].[hash:5].min.css'),
//     new webpack.optimize.UglifyJsPlugin({
//         compress: {
//             warnings: false
//         }
//     }),
//     new webpack.DefinePlugin({
//         'process.env': {
//             NODE_ENV: '"production"'
//         }
//     })
// )
//
// webpackConfig.output.filename = '[name].[hash:5].min.js'
// webpackConfig.vue = {
//     loaders: {
//         less: ExtractTextPlugin.extract('css!less')
//     }
// }
//
// module.exports = webpackConfig

