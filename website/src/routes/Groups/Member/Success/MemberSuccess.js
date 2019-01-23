import React from 'react'
import { Link } from 'react-router-dom'

const MemberSuccess = ({ match: { params: { id }} }) => (
	<div className="route-container">
		<div className="success-logo mt-5 mb-5" />
		<h3 className="mb-4">You'll now get a daily email introducing<br/> you to another member</h3>
		<h3 className="mb-5">You can also update your profile<br/>anytime you like</h3>
		<Link to={`/groups/${id}/member`} className="btn btn-primary mb-5">Update Profile</Link>
	</div>
)

export default MemberSuccess