// Events

{
	type: 'comment-new',
	data: {
		groupId,
		transactionId,
		comment,
	},
}

{
	type: 'group-new',
	data: {
		group,
	},
}

{
	type: 'group-members-change',
	data: {
		group,
		groupUser: {
			ghostUser,
			groupUserId,
			userId,
		},
		direction: 'added',
	},
}

{
	type: 'group-members-change',
	data: {
		group,
		groupUser: existing,
		direction: 'removed',
	},
}

{
	type: 'transaction-new',
	data: {
		transaction,
	}
}

{
	type: 'transaction-change',
	data: {
		transaction,
		oldTransaction,
	}
}
