import User from '../models/User'
import Token from '../models/Token'
// import { getFirebaseUserIdForToken } from '../firebase'
import { sendEmail } from '../email'
import { publicRoot } from '../config/website'

const login = async (parent, {
	emailAddress,
}, context) => {

	// let firebaseUserId
	// if (firebaseIdToken) {
	// 	firebaseUserId = await getFirebaseUserIdForToken(firebaseIdToken)
	// }

	// const credentials = await User.login({
	// 	firebaseUserId,
	// }, context)

	// return credentials
	try {
		const { id } = await User.ensureExists({ emailAddress })
		const { accessToken } = await Token.generate({ userId: id })
		const link = `${publicRoot}/login?accessToken=${accessToken}`
		await sendEmail({ recipient: emailAddress, data: { link }, type: 'login' })
	} catch (e) {
		console.error(e)

		return {
			success: false,
		}
	}

	return { 
		success: true,
	}
}

export default login
