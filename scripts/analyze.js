process.env.NODE_ENV = 'production';

const webpack = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const webpackConfigProd = require('../config/webpack.config')('production');
const WebpackBar = require('webpackbar');

webpackConfigProd.plugins = [
  ...webpackConfigProd.plugins,
  new BundleAnalyzerPlugin(),
  new WebpackBar({
    name: 'Analyze',
    color: '#83cd29',
  }),
];

// actually running compilation and waiting for plugin to start explorer
webpack(webpackConfigProd, (err, stats) => {
  if (err || stats.hasErrors()) {
    console.error(err);
  }
});
