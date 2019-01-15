import htmlTemplate from './html'
import plaintextTemplate from './text'

const subject = ({ data }) => 'Log in to link.baby'

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

const sender = () => null // system default

export default {
	subject,
	html,
	text,
	sender,
}