import User from '../models/User'
import Group from '../models/Group'
import Member from '../models/Member'

const groups = async (parent, { id, ids, ownerUserId }, context) => {
	if (!(context.auth && (context.auth.user || context.auth.member))) {
		throw new Error('unauthorized')
	}

	const currentUserId = context.auth.user ? context.auth.user.id : null
	const currentMemberEmailAddress = context.auth.member ? context.auth.member.emailAddress : null

	if (!ids && id) {
		ids = [id]
	}

	if (ownerUserId && ownerUserId === 'me') {
		ownerUserId = currentUserId
	}

	let q = Group.query().select('*')

	if (ids) {
		q = q.whereIn('id', ids)
	}

	if (ownerUserId) {
		q = q.where('ownerUserId', ownerUserId)
	}

	const groups = await q

	const members = await Member.query().select('*').whereIn('groupId', groups.map(g => g.id))

	return groups.map(group => {
		return Object.assign({}, group, {
			members: members
				.filter(member => member.groupId === group.id)
				.map(member => {
					if ((currentUserId && (currentUserId === group.ownerUserId)) || (currentMemberEmailAddress && (member.emailAddress === currentMemberEmailAddress))) {
						return member
					}

					return Object.assign({}, member, { emailAddress: undefined })
				}),
			})
	}).filter(group => {
		return (currentUserId && group.ownerUserId === currentUserId) || (currentMemberEmailAddress && group.members.find(member => member.emailAddress === currentMemberEmailAddress))
	})
}

export default groups
