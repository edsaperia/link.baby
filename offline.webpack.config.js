const config = require('./webpack.config.js')
const path = require('path')
const nodeExternals = require('webpack-node-externals')

module.exports = Object.assign({}, config, {
	entry: path.resolve(__dirname, 'offline.js'),
	mode: 'development',
	externals: [nodeExternals()],
})
