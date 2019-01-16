import Member from '../models/Member'

const updateMember = async (parent, { member }, context) => {
	if (!(context.auth && context.auth.member)) {
		throw new Error('unauthorized')
	}

	if (member.id === 'me') {
		member.id = context.auth.member.id
	}

	if (member.id !== context.auth.member.id) {
		throw new Error('unauthorized')
	}

	const newMember = await Member.update(member, context)

	return newMember
}

export default updateMember
