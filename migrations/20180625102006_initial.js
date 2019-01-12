const config = require('../src/config/db')

exports.up = async knex => {
	const db = config.database

	await knex.raw(`ALTER DATABASE ${db} CHARACTER SET utf8mb4;`)
	await knex.raw(`ALTER DATABASE ${db} COLLATE utf8mb4_unicode_520_ci;`)
}

exports.down = async knex => {
	const db = config.database

	await knex.raw(`ALTER DATABASE ${db} CHARACTER SET latin1;`)
	await knex.raw(`ALTER DATABASE ${db} COLLATE latin1_swedish_ci;`)
}
