import React from 'react'
import { Link } from 'react-router-dom'

const LoginCallback = () => (
	<div>
		<h1>loading...</h1>
		<Link to="/groups/">Groups</Link>
		<Link to="/groups/new">New Group</Link>
		<Link to="/member/">Member</Link>
	</div>
)

export default LoginCallback