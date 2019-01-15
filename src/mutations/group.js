import Group from '../models/Group'

const updateGroup = async (parent, { group }, context) => {
	if (!(context.auth && context.auth.user)) {
		throw new Error('unauthorized')
	}

	const currentUserId = context.auth.user.id

	if (group.id) {
		const currentGroup = await Group.query().select('*').where({ id: group.id }).first()
		if (currentGroup.ownerUserId !== currentUserId) {
			throw new Error('unauthorized')
		}
	}

	const newGroup = await Group.update({ group: Object.assign({}, group, { ownerUserId: currentUserId }) })

	return newGroup
}

export default updateGroup
