import uuid from 'uuid/v4'

import Model from './Model'
import Member from './Member'
import User from './User'

class Group extends Model {
	static get tableName() {
		return 'group'
	}

	static get relationMappings() {
		return {
			
		}
	}
}

Group.get = async ({ id }) => {
	const [group, members] = await Promise.all([
		Group.query().where({ id }).first(),
		Member.getGroupMembers({ groupId: id }),
	])

	const ownerUser = await User.get({ id: group.ownerUserId })

	return Object.assign({}, group, { members }, { ownerUser: Object.assign({}, ownerUser, { emailAddress: undefined }) })
}

Group.update = async ({ group }, context) => {
	let id

	const sanitizedGroup = Object.assign({}, group, { emailAddresses: undefined })

	if (group.id) {
		id = group.id
		await Group.query().update(sanitizedGroup).where({ id })
	} else {
		id = uuid()
		await Group.query().insert(Object.assign({}, sanitizedGroup, { id }))
	}

	const ownerUser = await User.get({ id: group.ownerUserId })

	const { emailAddresses } = group

	if (emailAddresses) {
		await Member.ensureExist({
			emailAddresses: [
				...emailAddresses,
				ownerUser.emailAddress, // add creator to group
			],
			groupId: id,
		}, context)
	}

	return Group.get({ id })
}

export default Group
