import React from 'react'
import { Link } from 'react-router-dom'

const GroupSuccess = ({ match: { params: { id }} }) => (
	<div className="route-container">
		<div className="emails-logo mt-5 mb-5" />
		<h3 className="mb-4">The attendees will now get an email prompting them to fill in their profile</h3>
		<h3 className="mb-5">You can also update the group<br/>anytime you like</h3>
		<Link to={`/groups/${id}`} className="btn btn-primary mb-5">Edit Group</Link>
	</div>
)

export default GroupSuccess