import Member from '../models/Member'
import Group from '../models/Group'
import Email from '../models/Email'

const sendGroupIntroEmail = async (parent, { groupId }, context) => {
	if (!(context.auth && context.auth.user)) {
		throw new Error('unauthorized')
	}

	const currentUserId = context.auth.user.id

	const currentGroup = await Group.query().select('*').where({ id: groupId }).first()
	if (currentGroup.ownerUserId !== currentUserId) {
		throw new Error('unauthorized')
	}

	const members = await Member.query().select('*').where('groupId', groupId)

	await Promise.all(
		members.map(member => (
			Email.queue({
				groupId,
				recipientMemberId: member.id,
				type: 'group-intro',
			}, context)
		))
	)

	await Group.query().update({ introEmailSentAt: Group.knex().raw('now()') }).where('id', groupId)

	return Group.get({ id: groupId })
}

export default sendGroupIntroEmail
