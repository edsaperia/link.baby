import uuid from 'uuid/v4'
import Model from './Model'
import Token from './Token'

class Member extends Model {
	static get tableName() {
		return 'member'
	}

	static get relationMappings() {
		return {
			
		}
	}
}

Member.getGroupMembers = async ({ groupId }) => {
	return await Member.query().select('*').where({ groupId })
}

Member.ensureExist = async ({ emailAddresses, groupId }) => {
	const existing = await Member.query().select('emailAddress').whereIn('emailAddress', emailAddresses).where('groupId', groupId)
	const existingEmailAddresses = existing.map(m => m.emailAddress)
	const toCreateEmails = emailAddresses.filter(emailAddress => !existingEmailAddresses.includes(emailAddress))

	const toCreateMembers = toCreateEmails.map(emailAddress => ({
		emailAddress,
		id: uuid(),
		groupId,
	}))

	if (toCreateMembers.length > 0) {
		await Member.knex().insert(toCreateMembers).into('member')
	}
}

Member.generateToken = async ({ id }) => {
	const accessToken = uuid()
	await Token.query().insert({
		id: uuid(),
		token: accessToken,
		memberId: id,
	})

	return { accessToken }
}

export default Member
