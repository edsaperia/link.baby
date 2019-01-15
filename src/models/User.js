import uuid from 'uuid/v4'

import Model from './Model'
import Token from './Token'

class User extends Model {
	static get tableName() {
		return 'user'
	}

	static get relationMappings() {
		return {}
	}
}

User.get = async ({ id }) => {
	const [
		user,
	] = await Promise.all([
		User.query().select('*').where('id', id).first(),
	])

	return user
}

User.merge = async ({ existingUserId, newUserId }) => {
	
}

User.login = async ({ emailAddress }, context) => {
	let userId

	const currentUserId = context.auth && context.auth.user && context.auth.user.id

	if (emailAddress) {
		const user = await User.query().select('id').where('emailAddress', emailAddress).first()
		if (user) {
			userId = user.id
		}
	}

	if (!userId) {
		const user = await User.query()
			.skipUndefined()
			.insert({
				id: uuid(),
				emailAddress,
			})

		userId = user.id
	}

	if (currentUserId && userId && currentUserId !== userId) {
		await User.merge({ existingUserId: currentUserId, newUserId: userId })
	}

	if (userId) {
		const accessToken = uuid()
		await Token.query().insert({
			id: uuid(),
			userId,
			token: accessToken,
		})

		return {
			accessToken,
		}
	}

	throw new Error('invalid')
}

User.logout = async ({ accessToken }) => {
	const token = await Token.query().update({ expiredAt: Token.knex().raw('now()') }).where({ token: accessToken })

	return token
}

User.update = async ({ id, firstName, lastName, emailAddress, firebaseUserId, imageUrl, description }, context) => {
	const oldUser = await User.query().select('*').where('id', id).first()
	if (emailAddress) {
		emailAddress = emailAddress.toLowerCase()
	}

	const newObj = Object.assign({}, oldUser)

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
	if (firebaseUserId) {
		newObj.firebaseUserId = firebaseUserId
	}
	if (imageUrl) {
		newObj.imageUrl = imageUrl
	}

	const user = await User.query().update(newObj).where({ id })

	context.emit({ type: 'user-change', data: { user, oldUser } })
		.catch(console.error)

	return User.get({ id })
}

export default User
