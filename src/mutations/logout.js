import User from '../models/User'

const logout = async (parent, { accessToken }, context) => {
	const status = await User.logout({ accessToken }, context)

	return {
		success: true,
	}
}

export default logout
