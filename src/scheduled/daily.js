import Email from '../models/Email'
import Member from '../models/Member'

const queueEmails = async (context) => {
	const type = 'peer-intro'

	const membersToLink = await Member.getUnlinkedMembers()
	const emails = membersToLink.map(link => Object.assign({}, link, { type }))
	await Email.queueBatch(emails, context)

	return true
}

const daily = async (context) => {
	await queueEmails(context)
}

export default daily