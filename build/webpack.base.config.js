var path = require('path');
var webpack = require('webpack');
var NyanProgressPlugin = require('nyan-progress-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var env = process.env.NODE_ENV.trim(); // 当前环境
var rootPath = path.resolve(__dirname, '..'); // 项目根目录
var client = path.join(rootPath, 'client'); // 开发源码目录
var commonPath = {
	rootPath: rootPath,
	distPath: path.join(rootPath, 'dist'), // 输出目录
	indexHTML: path.join(rootPath, 'index.html'),
	staticDir: path.join(rootPath, 'static') // 静态资源目录 
};

module.exports = {
	devtool: 'source-map',
	//commonPath: commonPath,
	entry: {
		app: path.join(client, 'main.js'),
		vendor: [
			'history',
			'lodash',
			'react',
			'react-dom',
			'react-redux',
			'react-router',
			'react-router-redux',
			'redux',
			'redux-thunk',
			'antd'
		]
	},
	output: {
		path: path.join(commonPath.distPath, 'static'),
    	publicPath: '/static/'	
	},
	resolve: {
		extensions: ['.js', '.jsx'],
		alias: {
			API: path.join(client, 'api'),
      		ACTION: path.join(client, 'actions'),
      		COMPONENT: path.join(client, 'components')	
		}	
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				use: ['babel-loader'],
				exclude: /node_modules/,
				include: path.join(rootPath, 'client')
			},
			{
				test: /\.css$/,
				use: ExtractTextPlugin.extract({
		          	fallback: 'style-loader',
		          	use: 'css-loader'
		        }),
		        exclude: /node_modules/
			},
			{
				test: /\.less$/,
				use: [
					'style-loader',
					'css-loader',
					{	
						loader: 'less-loader',
						options: {
							sourceMap: true
						}
					}
				],
				include: path.join(__dirname, 'client')
			},
			{
				test: /\.(jpe?g|png|gif|svg)$/,
				use: [
					{
						loader: 'url',
						options: {
							limit: 10240,
							name: 'static/images/[name].[ext]'
						}
					}
				]
			},
			{
				test: /\.(woff2?|eot|ttf|otf)$/,
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 10240,
							name: 'fonts/[name]-[hash:6].[ext]'
						}
					}
				]
			}	
		]	
	},
	plugins: [
		new NyanProgressPlugin(),
		new ExtractTextPlugin('[name].css'),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify('production'),
			__DEV__: env === 'development',
			__PROD__: env === 'production'
	    })
	]
}
