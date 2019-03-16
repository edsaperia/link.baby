link.baby

todo:
		- move "change org user" to just be name in group
			get event org user full name on "Tell us about your group", use that when sending emails

		- by default add org user's email address to groups they're making

		- make design not shitty


		- don't let things happen twice/validation

		- make logged out UI look like logged in UI but with login prompts

		- make "preview" bit of intro email have frame and link baby text etc. (like actual email)

		- on unsubscribe confirmation page
			- "also remove my details from being sent to others" button

		- attendee signup flow works like typeform
			- custom image


	- separate "add more people to group" page

	- product explainer on homepage

	- better copy everywhere

	- use gravatar

	- add linkedin

	- add facebook?

	- add custom image

	- https

	- analytics

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


