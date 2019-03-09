
exports.up = async knex => {
	await knex.schema.table('group', table => {
		table.string('organiserName')
	})
}

exports.down = async knex => {
	await knex.schema.table('group', table => {
		table.dropColumn('organiserName')
	})
}
