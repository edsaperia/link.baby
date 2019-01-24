import AWS from 'aws-sdk'

import login from './login'
import groupIntro from './groupIntro'
import peerIntro from './peerIntro'

const templates = {
	login,
	'group-intro': groupIntro,
	'peer-intro': peerIntro,
}

export const sendEmail = ({ recipient, data, type }) => {
	const ses = new AWS.SES()
	const charset = 'UTF-8'

	console.log(`sending ${type} email to ${recipient}`)

	if (!templates[type]) {
		throw new Error(`email template ${type} not found`)
	}

	const subject = templates[type].subject({ data })
	const text = templates[type].text({ data })
	const html = templates[type].html({ data })
	const sender = templates[type].sender ? templates[type].sender({ data }) : 'link.baby <hello@link.baby>'
	const replyTo = templates[type].replyTo ? templates[type].replyTo({ data }) : 'no-reply@link.baby'

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

	if (replyTo) {
		params.ReplyToAddresses = [replyTo]
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
