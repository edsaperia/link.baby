import AWS from 'aws-sdk'

import login from './login'

const sender = 'link.baby <hello@link.baby>'

const templates = {
	login,
}

export const sendEmail = ({ recipient, data, type }) => {
	const ses = new AWS.SES()
	const charset = 'UTF-8'

	if (!templates[type]) {
		throw new Error(`email template ${type} not found`)
	}

	const subject = templates[type].subject({ data })
	const text = templates[type].text({ data })
	const html = templates[type].html({ data })

	const params = {
		Source: sender,
		Destination: {
			ToAddresses: [
				recipient,
			],
		},
		Message: {
			Subject: {
				Data: subject,
				Charset: charset,
			},
			Body: {
				Text: {
					Data: text,
					Charset: charset,
				},
				Html: {
					Data: html,
					Charset: charset,
				},
			},
		},
	}

	return new Promise((resolve, reject) => {
		ses.sendEmail(params, (err, res) => {
			if (err) {
				reject(err)
			} else {
				resolve(res)
			}
		})
	})
}


export const asdf = () => {}
