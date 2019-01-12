const config = require('./src/models/knexfile').docker
const knex = require('knex')(config)

knex.migrate.latest().then(() => {
	console.log('migrations ran successfully')
	setTimeout(() => {
		process.exit()
	}, 2500)
}).catch(e => {
	console.error('migrations failed to run:', e)
	setTimeout(() => {
		process.exit(1)
	}, 5000)
})
