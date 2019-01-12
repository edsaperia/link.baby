const path = require('path')

const {
	host,
	user,
	password,
	database,
} = require('../config/db')

const docker = {
	client: 'mysql',
	connection: {
		host,
		user,
		password,
		database,
		charset: 'utf8mb4',
		timezone: '0000',
	},
	migrations: {
		tableName: 'knex_migrations',
		directory: path.resolve(__dirname, '..', '..', 'migrations'),
	},
	pool: {
		min: 0,
		max: 10,
	},
}

const test = Object.assign({}, docker, {
	// allow multipleStatements for the messy db reset script
	connection: Object.assign({}, docker.connection, { multipleStatements: true }),
})

module.exports = {
	development: docker,
	staging: docker,
	production: docker,
	docker,
	test,
}
