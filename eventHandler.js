import 'babel-polyfill'

import events from './src/events'

const eventMapper = event => {
	if (event.Records[0].Sns) {
		return JSON.parse(event.Records[0].Sns.Message)
	}
	if (event.Records[0].s3) {
		return {
			type: 's3Event',
			data: event.Records[0],
		}
	}

	return null
}

export const eventHandler = (event, context, callback) => {  //eslint-disable-line
	context.callbackWaitsForEmptyEventLoop = false  //eslint-disable-line

	let message = {}
	try {
		message = eventMapper(event)
	} catch (e) {
		return callback(e, null)
	}

	const { type, data } = message

	if (events[type]) {
		events[type](data)
			.then(res => {
				callback(null, res)
			})
			.catch(e => {
				callback(e, null)
			})
	} else {
		callback(`unhandled event ${type}`)
	}

	return null
}
