const path = require("path")
const webpackConfig = require("../webpack.config")

module.exports = {
  module: webpackConfig.module,
  resolve: webpackConfig.resolve,
}