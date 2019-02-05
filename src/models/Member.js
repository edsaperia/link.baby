import uuid from 'uuid/v4'
import Model from './Model'
import Token from './Token'
import Email from './Email'

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
	const members = await Member.query().select('*').where({ groupId })

	return members.map(member => Object.assign({}, member, { optedIn: !!member.optedInOn && !member.optedOutOn }))
}

Member.ensureExist = async ({ emailAddresses, groupId }, context) => {
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

		toCreateMembers.forEach(member => {
			Email.queue({
				groupId,
				recipientMemberId: member.id,
				type: 'group-intro',
			}, context)
		})
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
	const member = await Member.query().select('*').where('id', id).first()

	return Object.assign({}, member, { optedIn: !!member.optedInOn && !member.optedOutOn })
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

	if (optedIn) {
		newObj.optedInOn = Member.knex().raw('now()')
		newObj.optedOutOn = null
	} else {
		newObj.optedOutOn = Member.knex().raw('now()')
	}

	const member = await Member.query().update(newObj).where({ id })

	context.emit({ type: 'member-change', data: { member, oldMember } })
		.catch(console.error)

	return Member.get({ id })
}

Member.getUnlinkedMembers = async () => {
	const [rows] = await Member.knex().raw(`
		select
			m.id recipientMemberId, 
			m2.id subjectMemberId, 
			m.groupId groupId
		from member m, member m2
		left join email e on (e.recipientMemberId = recipientMemberId and e.subjectMemberId = subjectMemberId)
		where m.id != m2.id
		and m.groupId = m2.groupId
		and e.id is null
	`)

	return rows
}

export default Member
