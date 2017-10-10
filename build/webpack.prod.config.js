var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

var base = require('./webpack.base.config');

base.output.filename = '[name][chunkhash:6].js';
base.output.chunkFilename = '[id][chunkhash:6].js';

base.plugins.push(
	new CopyWebpackPlugin([{
	    context: '../static',
	    from: '**/*',
	    ignore: ['*.md']
	}]),
	new webpack.optimize.DedupePlugin(),
	new webpack.optimize.UglifyJsPlugin({
	    sourceMap: false,
	    compress: {
	      	warnings: false
	    },
	    output: {
	      	comments: false
	    }
	}),	
	new webpack.optimize.CommonsChunkPlugin({
	    names: ['vendor', 'mainifest']
	}),
	new webpack.optimize.AggressiveMergingPlugin(),
	new webpack.optimize.MinChunkSizePlugin({
    	minChunkSize: 30000
  	}),
  	new HtmlWebpackPlugin({
	    filename: 'index.html',
	    template: 'index.html',
	    chunksSortMode: 'none'
	})
);

module.exports = base;
