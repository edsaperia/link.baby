import React from 'react'
import { Redirect } from 'react-router-dom'

const LoginCallback = ({ actor }) => {
	if (actor) {
		if (actor.user) {
			return <Redirect to="/groups" />
		}
		if (actor.member) {
			return <Redirect to={`/groups/${actor.member.groupId}/member`} />
		}
	}

	return (
		<div>
			<h1>loading...</h1>
		</div>
	)
}

export default LoginCallback