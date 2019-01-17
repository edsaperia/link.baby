import htmlTemplate from './html'
import plaintextTemplate from './text'

const subject = ({ data }) => `Intro to ${data.subjectName}`

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

const sender = ({ data }) => `${data.groupOwnerName} via link.baby<hello@link.baby>`
const replyTo = ({ data }) => data.subjectEmail

export default {
	subject,
	html,
	text,
	sender,
}
