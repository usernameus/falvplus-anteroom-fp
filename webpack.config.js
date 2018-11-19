const webpack = require('atool-build/lib/webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = function (webpackConfig, env) {


  webpackConfig.babel.plugins.push('transform-runtime')

  // Support hmr
  if (env === 'development') {
    webpackConfig.devtool = '#eval'
    webpackConfig.babel.plugins.push(['dva-hmr', {
      entries: [
        './src/index.js'
      ]
    }])
  } else {
    webpackConfig.output.filename = "[name].[chunkhash:4].js"
    webpackConfig.output.chunkFilename = "[id].[chunkhash:4].js"
    // webpackConfig.output = {
    //   path: './dist',
    //   publicPath: '/',
    //   filename:'index.js',
    //   chunkFilename: '[id].[hash:4].js'
    // }
    webpackConfig.babel.plugins.push('dev-expression')
    // webpackConfig.plugins.push(
    //   new HtmlWebpackPlugin({
    //     inject: false,
    //     template: require('html-webpack-template'),
    //     title: '专属会客室',
    //     appMountId: 'root',
    //     minify: {
    //       removeComments: true,
    //       collapseWhitespace: true
    //     },
    //     // links:['//at.alicdn.com/t/font_xxxxxxxx.css']
    //   })
    // );
    webpackConfig.plugins.push(
      new HtmlWebpackPlugin({
        title: '法仆&reg;律师专属会客室,律师咨询,网上面对面',
        filename: 'index.html',
        template: 'src/index-tpl.ejs',
        inject:'body'
      })
    )
  }


  // Don't extract common.js and common.css
  webpackConfig.plugins = webpackConfig.plugins.filter(function (plugin) {
    return !(plugin instanceof webpack.optimize.CommonsChunkPlugin)
  })
  // webpackConfig.plugins.push(new webpack.optimize.CommonsChunkPlugin('vendor','manifest'));

  // Support CSS Modules
  // Parse all less files as css module.
  webpackConfig.module.loaders.forEach(function (loader, index) {
    if (typeof loader.test === 'function' && loader.test.toString().indexOf('\\.less$') > -1) {
      loader.include = /node_modules/
      loader.test = /\.less$/
    }
    if (loader.test.toString() === '/\\.module\\.less$/') {
      loader.exclude = /node_modules/
      loader.test = /\.less$/
    }
    if (typeof loader.test === 'function' && loader.test.toString().indexOf('\\.css$') > -1) {
      loader.include = /node_modules/
      loader.test = /\.css$/
    }
    if (loader.test.toString() === '/\\.module\\.css$/') {
      loader.exclude = /node_modules/
      loader.test = /\.css$/
    }
  })

  // Alias
  webpackConfig.resolve = {
    alias:{
      // zrender: 'react-zrender/node_modules/zrender/lib'
    }
  };
  webpackConfig.babel.plugins.push(['import', {
    libraryName: 'antd',
    style: true
  }])

  return webpackConfig
}
