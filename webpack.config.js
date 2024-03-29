const path = require('path')
// eslint-disable-next-line import/no-extraneous-dependencies
const nodeExternals = require('webpack-node-externals')
// eslint-disable-next-line import/no-extraneous-dependencies
const slsw = require('serverless-webpack')

module.exports = {
	entry: slsw.lib.entries,
	target: 'node',
	externals: [nodeExternals(), { 'aws-sdk': 'aws-sdk' }],
	module: {
		rules: [
			{
				test: /\.js$/,
				use: [
					{
						loader: 'babel-loader',
						options: {
							presets: [['env', { targets: { node: '8.10' } }]],
						},
					},
				],
			},
		],
	},
	output: {
		libraryTarget: 'commonjs',
		path: path.join(__dirname, '.webpack'),
		filename: '[name].js',
	},
}
