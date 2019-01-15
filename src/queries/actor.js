const actor = async (parent, args, context) => {
	return Object.assign({}, context.auth, { accessToken: context.auth.token })
}

export default actor