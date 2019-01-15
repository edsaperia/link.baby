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

	console.log(members)

	const ownerUser = await User.get({ id: group.ownerUserId })

	return Object.assign({}, group, { members }, { ownerUser: Object.assign({}, ownerUser, { emailAddress: undefined }) })
}

Group.update = async ({ group }) => {
	let newGroup

	const sanitizedGroup = Object.assign({}, group, { emailAddresses: undefined })

	if (group.id) {
		newGroup = group
		await Group.query().update(sanitizedGroup).where({ id: group.id })
	} else {
		newGroup = Object.assign({}, sanitizedGroup, { id: uuid() })
		await Group.query().insert(newGroup)
	}

	const { emailAddresses } = group

	if (emailAddresses) {
		await Member.ensureExist({ emailAddresses, groupId: newGroup.id })
	}

	return Group.get({ id: newGroup.id })
}

export default Group
