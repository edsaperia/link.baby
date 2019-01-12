const fs = require('fs')
const path = require('path')

const stage = process.env.STAGE
const region = process.env.AWS_REGION

const handler = (data, serverless, options) => {
	console.log('stack output:', data)
	const filePath = path.resolve(__dirname, '..', 'config.json')

	const config = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
	config[stage] = config[stage] || {
		status: {
			up: true,
			message: '',
		},
		graphql: {},
	}

	config[stage].graphql = {
		url: data.GraphQlApiUrl,
		token: data.GraphQlApiKeyDefault,
		region,
	}

	fs.writeFileSync(filePath, JSON.stringify(config), 'utf-8')
}

module.exports = { handler }