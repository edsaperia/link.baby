import Model from './Model'
import User from './User'

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
	const user = await User.query()
		.select('*')
		.where('id',
			Token.query()
				.select('userId')
				.where({ token })
		)
		.first()

	return user
}

export default Token
