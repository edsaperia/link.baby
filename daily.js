import daily from './src/scheduled/daily'
import emit from './src/events/emit'

export const dailyHandler = (event, context, callback) => {  //eslint-disable-line
	context.callbackWaitsForEmptyEventLoop = false  //eslint-disable-line
	const ctx = {
		emit,
	}

	daily(ctx)
		.then(() => {
			callback(null, null)
		}).catch(e => {
			callback(e, null)
		})
}
