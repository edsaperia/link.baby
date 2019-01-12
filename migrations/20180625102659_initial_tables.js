
exports.up = async knex => {
	await knex.schema.createTable('user', table => {
		table.uuid('id').primary()

		table.string('firstName')
		table.string('lastName')
		table.string('emailAddress')
		table.string('imageUrl')
		table.string('facebookUserId', 128)
		table.string('twitterUserId', 128)
		table.string('googleUserId', 190)

		table.timestamp('createdAt').defaultTo(knex.raw('current_timestamp'))
		table.timestamp('updatedAt').defaultTo(knex.raw('current_timestamp on update current_timestamp'))

		table.charset('utf8mb4')
		table.collate('utf8mb4_unicode_ci')
	})

	await knex.raw('alter table `user` add unique `user_facebookUserId_unique`(`facebookUserId` (128))')
	await knex.raw('alter table `user` add unique `user_twitterUserId_unique`(`twitterUserId` (128))')
	await knex.raw('alter table `user` add unique `user_email_unique`(`email` (190))')
	await knex.raw('alter table `user` add unique `user_googleUserId_unique`(`googleUserId` (190))')

	await knex.schema.createTable('group', table => {
		table.uuid('id').primary()

		table.uuid('ownerUserId').index().references('id')
			.inTable('user')

		table.string('title')
		table.text('description')
		table.text('introEmailContent')

		table.timestamp('createdAt').defaultTo(knex.raw('current_timestamp'))
		table.timestamp('updatedAt').defaultTo(knex.raw('current_timestamp on update current_timestamp'))

		table.charset('utf8mb4')
		table.collate('utf8mb4_unicode_ci')
	})

	await knex.schema.createTable('member', table => {
		table.uuid('id').primary()

		table.uuid('groupId').index().references('id')
			.inTable('group')

		table.string('firstName')
		table.string('lastName')
		table.string('emailAddress')
		table.text('description')

		table.timestamp('optedInOn').nullable()
		table.timestamp('optedOutOn').nullable()

		table.timestamp('createdAt').defaultTo(knex.raw('current_timestamp'))
		table.timestamp('updatedAt').defaultTo(knex.raw('current_timestamp on update current_timestamp'))

		table.charset('utf8mb4')
		table.collate('utf8mb4_unicode_ci')
	})

	await knex.schema.createTable('email', table => {
		table.uuid('id').primary()

		table.uuid('groupId').index().references('id')
			.inTable('group')
		table.uuid('recipientEmailId').index().references('id')
			.inTable('member')
		table.uuid('recipientMemberId').index().references('id')
			.inTable('member')
		table.uuid('subjectMemberId').index().references('id')
			.inTable('member')

		table.string('type') // initial or member

		table.string('status') // bounced, complained, sent

		table.timestamp('sentAt').nullable()
		table.timestamp('bouncedAt').nullable()
		table.timestamp('complainedAt').nullable()

		table.timestamp('createdAt').defaultTo(knex.raw('current_timestamp'))
		table.timestamp('updatedAt').defaultTo(knex.raw('current_timestamp on update current_timestamp'))

		table.charset('utf8mb4')
		table.collate('utf8mb4_unicode_ci')
	})

	await knex.schema.createTable('auth_token', table => {
		table.uuid('id').primary()
		table.uuid('userId').index().references('id')
			.inTable('user')
		table.uuid('memberId').index().references('id')
			.inTable('member')

		table.string('token')
		table.timestamp('expiredAt').nullable()

		table.charset('utf8mb4')
		table.collate('utf8mb4_unicode_ci')
	})

	await knex.raw('alter table `auth_token` add unique `auth_token_token_unique`(`token` (190))')
	
}

exports.down = async knex => {
	await knex.schema.dropTable('auth_token')
	await knex.schema.dropTable('email')
	await knex.schema.dropTable('member')
	await knex.schema.dropTable('group')
	await knex.schema.dropTable('user')
}
