const webpack = require('webpack'),
	path = require('path'),
	ExtractTextPlugin = require('extract-text-webpack-plugin'),
	BrowserSyncPlugin = require('browser-sync-webpack-plugin'),
	inProduction = (process.env.NODE_ENV === 'production');

module.exports = {
	entry: {
		app: [
			'./scripts/app.js',
			'./scss/style.scss'
		],
	},
	output: {
		path: path.resolve(__dirname, './public/assets/js'),
		filename: '[name].js'
	},
	module: {
		rules: [
			{
				test: /\.s[ac]ss$/,
				use: ExtractTextPlugin.extract({
					use: ['css-loader', 'sass-loader'],
					fallback: 'style-loader'
				})
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: "babel-loader"
			}
		]
	},
	plugins: [
		new ExtractTextPlugin("../css/style.css"),
		new webpack.LoaderOptionsPlugin({
			minimize: inProduction,
			debug: !inProduction,
			options: {
				context: __dirname
			}
		}),
		new BrowserSyncPlugin({
			host: 'localhost',
			port: 3000,
			server: { baseDir: ['public'] }
		}, {
			reload: true,
			injectCss: true
		}),
		new webpack.ProvidePlugin({
			jQuery: 'jquery',
			$: 'jquery',
			jquery: 'jquery'
		})
	]
}