link.baby

todo:
	- [bug] login emails get sent twice

	- choose colors

	- edit group after creation button should say "save" not "next:"

	- product explainer on homepage

notes:

based on https://github.com/andylolz/link.baby

	user touch points:
		landing page
			logo
			value prop
			get started

		sign up/login
			get user id

		view my groups
			list groups

		new group
			id
			userId
			introductory email content
			email addresses

		view group
			all bios + contact details etc.

		activate group
			opt-in emails with intro email content get sent to each email in group

		activate group member
			opt in to emails
			set bio

		every day get email (which spans groups)
			opt out link

	graphql:
		types
			Token
				id
				token
				user
				member
			Group
				id
				name
				ownerUserId
				introContent
				emailAddresses
			Member
				id
				group
				optedIn

		mutations
			login(provider, accessToken): Token
			group(id [nullable], emailAddresses, introContent): Group
			addGroupMembers(groupId, emailAddresses): Group
			activateMember(memberId): Member
			deactivateMember(memberId): Member

		queries
			actor: Token
			groups(id): Group
			myGroups: [Group]


	db:
		token
			id
			userId
			memberId

		user
			id

		group
			id
			ownerUserId
			introEmailContent

		email
			id
			groupId
			recipientMemberId
			subjectMemberId
			status

		member
			id
			groupId
			emailAddress
			optedInOn
			optedOutOn


