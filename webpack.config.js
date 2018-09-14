const
	autoprefixer = require('autoprefixer'),
	CleanWebpackPlugin = require('clean-webpack-plugin'),
	glob = require('glob'),
	MiniCSSExtractPlugin = require('mini-css-extract-plugin'),
	path = require('path'),
	postCssPresetEnv = require('postcss-preset-env'),
	postCssScss = require('postcss-scss');

const OUTPUT_DIR = path.resolve(__dirname);

module.exports = {
	entry: {
		'style': './style.scss'
	},
	output: {
		path: OUTPUT_DIR,
		filename: 'dist/js/[name].js',
	},
	module: {
		rules: [
			{
				test: /\.(sa|sc|c)ss$/,
				exclude: ['/node_modules'],
				use: [
					MiniCSSExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							sourceMap: true,
							minimize: process.env.NODE_ENV === 'production',
						}
					},
					{
						loader: 'postcss-loader',
						options: {
							sourceMap: true,
							syntax: postCssScss,
							plugins: () => [
								autoprefixer,
								postCssPresetEnv({
									stage: 0,
									features: {
										'color-mod-function': true,
										'alpha-hex-colors': true
									}
								}),
							],
						},
					},
					{
						loader: 'sass-loader',
						options: {
							sourceMap: true
						}
					}
				]
			}
		]
	},
	devServer: {
		overlay: true,
		contentBase: OUTPUT_DIR,
		watchContentBase: true,
	},
	devtool: process.env.NODE_ENV === 'development' ? 'cheap-module-eval-source-map' : 'source-map',
	resolve: {
		extensions: ['.js', '.css', '.scss'],
		alias: {
			'css': path.resolve(__dirname, './src/css')
		}
	},
	plugins: [
		new MiniCSSExtractPlugin({
			filename: '[name].css',
		}),
		new CleanWebpackPlugin(['./dist/', './docs/dist']),
	]
};