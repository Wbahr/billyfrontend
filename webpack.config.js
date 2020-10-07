const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin');
const webpack = require('webpack')
const dotenv = require('dotenv')
const fs = require('fs')
const path = require('path')

module.exports = (env) => {
	const cleanWebpackPlugin = new CleanWebpackPlugin()
	const htmlWebpackPlugin = new HtmlWebPackPlugin({
		template: './src/index.html',
		filename: './index.html',
		favicon: './src/favicon.ico'
	})
	const sourceMapDevToolPlugin = new webpack.SourceMapDevToolPlugin({
		filename: '[name].[hash].js.map',
		exclude: 'vendors',
	})
	const copyWebpackPlugin = new CopyPlugin({
		patterns: [{
			from: './src/web.config',  to: 'web.config'
		}]
	})

	const currentPath = path.join(__dirname)
	const basePath = currentPath + '/.env'
	const envPath = basePath + '.' + env.ENVIRONMENT
	const finalPath = fs.existsSync(envPath) ? envPath : basePath
	const fileEnv = dotenv.config({ path: finalPath }).parsed
	const envKeys = Object.keys(fileEnv).reduce((prev, next) => {
		prev[`process.env.${next}`] = JSON.stringify(fileEnv[next])
		return prev
	}, {})

	const definePlugin = new webpack.DefinePlugin(envKeys)
	return {
		entry: './src/index.js',
		devtool: false,
		output: {
			path: path.resolve(__dirname, './dist'),
			filename: '[name].[hash].js',
			publicPath: '/'
		},
		resolve: {
			modules: [
				path.resolve(__dirname, './src'),
				'node_modules'
			]
		},
		module: {
			rules: [
				{
					test: /\.js$/,
					exclude: /node_modules/,
					use: {
						loader: 'babel-loader'
					}
				},
				{
					test: /\.(woff(2)?|ttf|eot|svg|otf)(\?v=\d+\.\d+\.\d+)?$/,
					use: [
						{
							loader: 'file-loader',
							options: {
								name: '[name].[ext]',
								outputPath: 'fonts/'
							}
						}
					]
				},
				{
					test: /\.(png|jpe?g|gif)$/,
					use: [
						{
							loader: 'file-loader',
							options: {},
						}
					]
				},
				{
					test: /\.svg$/,
					use: [
						{
							loader: 'svg-inline-loader'
						}
					]
				},
				{
					test: /\.s?css$/,
					use: ['style-loader', 'css-loader', 'sass-loader']          
				}
			]
		},
		devServer: {
			historyApiFallback: true,
		},
		optimization: {
			moduleIds: 'hashed',
			runtimeChunk: 'single',
			splitChunks: {
				cacheGroups: {
					vendor: {
						test: /[\\/]node_modules[\\/]/,
						name: 'vendors',
						chunks: 'all',
					},
				},
			},
		},
		plugins: [
			htmlWebpackPlugin, 
			definePlugin, 
			cleanWebpackPlugin,
			sourceMapDevToolPlugin,
			copyWebpackPlugin
		]
	}
}
