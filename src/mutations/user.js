import User from '../models/User'
// import { getMeId } from '../facebook'
// import { getFirebaseUserIdForToken } from '../firebase'

const updateUser = async (parent, { user }, context) => {
	if (!(context.auth && context.auth.user)) {
		throw new Error('unauthorized')
	}

	if (user.id === 'me') {
		user.id = context.auth.user.id
	}

	if (user.id !== context.auth.user.id) {
		throw new Error('unauthorized')
	}

	// if (user.firebaseIdToken) {
	// 	user.firebaseUserId = await getFirebaseUserIdForToken(user.firebaseIdToken)
	// 	delete user.firebaseIdToken
	// }

	// if (user.facebookAccessToken) {
	// 	user.facebookUserId = await getMeId({ accessToken: user.facebookAccessToken })
	// 	delete user.facebookAccessToken
	// }

	const newUser = await User.update(user, context)

	return newUser
}

export default updateUser
