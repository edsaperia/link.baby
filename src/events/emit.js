const AWS = require('aws-sdk')

const sns = new AWS.SNS({
	endpoint: process.env.SNS_ENDPOINT,
	region: process.env.AWS_REGION,
})

export default ({ type, data }) => {
	return new Promise((resolve, reject) => {
		sns.publish({
			Message: JSON.stringify({ default: JSON.stringify({ type, data }) }),
			Subject: type,
			MessageStructure: 'json',
			TopicArn: process.env.SNS_TOPIC,
		}, (err, data) => {
			if (err) {
				reject(err)
			} else {
				resolve(data)
			}
		})
	})
}