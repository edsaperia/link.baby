import uuid from 'uuid/v4'
import Model from './Model'

class Email extends Model {
	static get tableName() {
		return 'email'
	}

	static get relationMappings() {
		return {
			
		}
	}
}

Email.queueBatch = async (emails, { emit }) => {
	const toCreateEmails = emails.map(({ groupId,
		recipientMemberId,
		subjectMemberId,
		type,
	}) => ({
		id: uuid(),
		groupId,
		recipientMemberId,
		subjectMemberId,
		type,
	}))

	await Email.knex().insert(toCreateEmails).into('email')

	await Promise.all(toCreateEmails.map(email => emit({ type: 'email-queued', data: { email } })))
}

Email.queue = async ({ groupId, recipientMemberId, subjectMemberId, type }, { emit }) => {
	const id = uuid()

	const email = {
		id,
		groupId,
		recipientMemberId,
		subjectMemberId,
		type,
	}

	await Email.query().insert(email)

	emit({ type: 'email-queued', data: { email } })
}

Email.markSent = async ({ id, sentAt, sesMessageId }) => {
	await Email.query().update({
		id,
		sentAt,
		sesMessageId,
		status: 'sent',
	}).where({ id })
}

Email.markBounced = async ({ bouncedAt, sesMessageId }) => {
	await Email.query().update({
		bouncedAt,
		status: 'bounced',
	}).where({ sesMessageId })
}

Email.markComplained = async ({ complainedAt, sesMessageId }) => {
	await Email.query().update({
		complainedAt,
		status: 'complained',
	}).where({ sesMessageId })
}

export default Email
