const HtmlWebPackPlugin = require('html-webpack-plugin')

const htmlWebpackPlugin = new HtmlWebPackPlugin({
	template: './src/index.html',
	filename: './index.html'
})
var path = require('path');
module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'index_bundle.js'
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
				test: /\.css$/,
				use: [
					{
						loader: 'style-loader'
					},
					{
						loader: 'css-loader'
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
			}
		]
	},
	plugins: [htmlWebpackPlugin]
}
