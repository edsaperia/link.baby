import Model from './Model'
import User from './User'
import Member from './Member'

class Token extends Model {
	static get tableName() {
		return 'auth_token'
	}

	static get relationMappings() {
		return {
			
		}
	}
}

Token.getUser = async ({ token }) => {
	if (token.startsWith('m-')) {
		const member = await Member.query()
			.select('*')
			.where('id',
				Token.query()
					.select('memberId')
					.where({ token })
			)
			.first()

		return {
			member,
		}
	} else {
		const user = await User.query()
			.select('*')
			.where('id',
				Token.query()
					.select('userId')
					.where({ token })
			)
			.first()

		return {
			user,
		}
	}
	
}

export default Token
