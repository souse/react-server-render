var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var base = require('./webpack.base.config');

base.output.filename = '[name].js';
base.output.chunkFilename = '[id].js';
base.output.publicPath = '/';

base.entry = [
	base.entry.app,
	'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000'
];

base.plugins.push(
  	new webpack.HotModuleReplacementPlugin(),
  	new webpack.NoErrorsPlugin(),
  	new HtmlWebpackPlugin({
	    filename: 'index.html',
	    template: 'index.html',
	    chunksSortMode: 'none'
  	})
);

module.exports = base;