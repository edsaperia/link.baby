import User from '../models/User'

const users = async (parent, { id, ids }, context) => {
	if (!(context.auth && context.auth.user)) {
		throw new Error('unauthorized')
	}

	const currentUserId = context.auth.user.id

	if (!ids && id) {
		ids = [id]
	}

	let q = User.query().select('*')

	if (ids) {
		ids = ids.map(id => {
			if (id === 'me') {
				return currentUserId
			}

			return id
		})

		q = q.whereIn('id', ids)
	}

	if (ids.length === 1 && ids[0] === currentUserId) {
		return [context.auth.user]
	}

	const usrs = await q

	let currentUser
	if (usrs && usrs.map(u => u.id).includes(currentUserId)) {
		currentUser = context.auth.user
	}

	return usrs.map(user => {
		if (user.id === currentUserId) {
			return currentUser
		}

		return {
			id: user.id,
			firstName: user.firstName,
			lastName: user.lastName,
			imageUrl: user.imageUrl,
		}
	})
}

export default users
