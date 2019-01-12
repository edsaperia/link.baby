import 'babel-polyfill'

import queries from './src/queries'
import mutations from './src/mutations'

import emit from './src/events/emit'

import Token from './src/models/Token'

const handlers = Object.assign({}, queries, mutations)
// const handlers = {
// 	...queries,
// 	...mutations,
// }

const authMiddleware = async authHeader => {
	const token = authHeader && authHeader.split('Bearer ')[1]
	if (token) {
		const user = await Token.getUser({ token })

		return {
			user,
			token,
		}
	}

	return null
}

export const graphqlHandler = (events, context, callback) => { //eslint-disable-line
	context.callbackWaitsForEmptyEventLoop = false  //eslint-disable-line
	if (!events.length && events.source === 'serverless-plugin-warmup') {
		console.log('WarmUP - Lambda is warm!')

		return callback(null, 'Lambda is warm!')
	}
	console.log('Got an Invoke Request.', JSON.stringify(events, null, '\t'))

	const info = null
	const { authorization, Authorization } = events[0].headers
	const authHeader = authorization || Authorization

	authMiddleware(authHeader)
		.then(auth => {
			const ctx = {
				emit: ({ type, data }) => emit({ type, data: Object.assign({}, data, { auth }) }),
				auth,
			}

			return Promise.all(events.map(async event => {
				if (handlers[event.field]) {
					return handlers[event.field](event.parent, event.arguments, ctx, info)
				}
				throw new Error(`Unknown field, unable to resolve ${event.field}`)
			}))
		})
		.then(res => {
			callback(null, res)
		})
		.catch(e => {
			callback(e, null)
		})
}
