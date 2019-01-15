import AWS from 'aws-sdk'

import login from './login'
import groupIntro from './groupIntro'

const templates = {
	login,
	'group-intro': groupIntro,
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
	const sender = templates[type].sender({ data }) || 'link.baby <hello@link.baby>'

	console.log(sender)

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
