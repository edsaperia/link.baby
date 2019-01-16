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
	const accessToken = `m-${uuid()}`
	await Token.query().insert({
		id: uuid(),
		token: accessToken,
		memberId: id,
	})

	return { accessToken }
}

Member.get = async ({ id }) => {
	return Member.query().select('*').where('id', id).first()
}

Member.update = async ({ id, firstName, lastName, emailAddress, imageUrl, description, optedIn }, context) => {
	const oldMember = await Member.query().select('*').where('id', id).first()
	if (emailAddress) {
		emailAddress = emailAddress.toLowerCase()
	}

	const newObj = Object.assign({}, oldMember)

	if (firstName) {
		newObj.firstName = firstName
		if (!lastName) {
			newObj.lastName = ''
		}
	}
	if (lastName) {
		newObj.lastName = lastName
	}
	if (emailAddress) {
		newObj.emailAddress = emailAddress
	}
	if (description) {
		newObj.description = description
	}
	if (imageUrl) {
		newObj.imageUrl = imageUrl
	}
	if (optedIn && oldMember.optedIn) {
		newObj.optedInOn = Member.knex().raw('now()')
	}
	if (!optedIn && oldMember.optedIn) {
		newObj.optedOutOn = Member.knex().raw('now()')
	}

	const member = await Member.query().update(newObj).where({ id })

	context.emit({ type: 'member-change', data: { member, oldMember } })
		.catch(console.error)

	return Member.get({ id })
}
export default Member
