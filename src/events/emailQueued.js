import Email from '../models/Email'
import Member from '../models/Member'
import Group from '../models/Group'
import User from '../models/User'

import { sendEmail } from '../email'

const emailQueued = async ({ email: eventEmail }) => {
	const { id } = eventEmail

	const email = await Email.query().select('*').where('id', id).first()

	if (email.sentAt) {
		// already sent so bail
		return
	}

	// TODO: if member has ever complained about emails then don't send

	const member = await Member.query().select('*').where('id', email.recipientMemberId).first()
	const group = await Group.query().select('*').where('id', email.groupId).first()
	const { accessToken } = await Member.generateToken({ id: email.recipientMemberId })
	const sender = await User.query().select('*').where('id', Group.query().select('ownerUserId').where('id', email.groupId)).first()

	let data = {}

	if (email.type === 'group-intro') {
		data = {
			senderName: `${sender.firstName} ${sender.lastName}`,
			recipientName: `${member.firstName} ${member.lastName}`,
			groupName: group.title,
			groupDescription: group.description,
			accessToken,
			introEmailContent: group.introEmailContent,
		}
	}

	if (email.type === 'peer-intro') {
		const subjectMember = await Member.query().select('*').where('id', email.subjectMemberId).first()

		data = {
			recipientName: `${member.firstName} ${member.lastName}`,
			subjectName: `${subjectMember.firstName} ${subjectMember.lastName}`,
			groupOwnerName: `${sender.firstName} ${sender.lastName}`,
			subjectEmail: subjectMember.emailAddress,
			subjectDescription: subjectMember.description,
			groupName: group.title,
			accessToken,
		}
	}

	const result = await sendEmail({
		recipient: member.emailAddress,
		data,
		type: email.type,
	})

	const sesMessageId = result.MessageId

	await Email.markSent({ id, sentAt: Email.knex().raw('now()'), sesMessageId })

	return true
}

export default emailQueued