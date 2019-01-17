import htmlTemplate from './html'
import plaintextTemplate from './text'

const subject = ({ data }) => `${data.groupName}: invitation to stay connected`

const html = ({ data }) => {
	let template = htmlTemplate()
	Object.keys(data).forEach(key => {
		template = template.split(`$data.${key}`).join(data[key])
	})

	return template
}

const text = ({ data }) => {
	let template = plaintextTemplate()
	Object.keys(data).forEach(key => {
		template = template.split(`$data.${key}`).join(data[key])
	})

	return template
}

const sender = ({ data }) => `${data.senderName} via link.baby<hello@link.baby>`

export default {
	subject,
	html,
	text,
	sender,
}
