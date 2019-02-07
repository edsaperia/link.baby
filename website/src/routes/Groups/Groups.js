import React from 'react'
import { Redirect, Link } from 'react-router-dom'

const Group = ({ id, title, description, members, introEmailSentAt }) => (
	<div className="card" style={{ flex: 1, marginBottom: '2rem' }}>
		<div className="card-body">
			<h5 className="card-title">{title}</h5>
			<h6 className="card-subtitle mb-2 text-muted">{members.length} members</h6>
			<p className="card-text">{description}</p>
			<Link to={`/groups/${id}`} className="btn btn-outline-secondary">edit group</Link>
			{!introEmailSentAt ? <Link to={`/groups/${id}/intro-email`} className="btn btn-outline-secondary ml-2">write intro email</Link> : null}
		</div>
	</div>
)

const Groups = ({ loading, loadingGroups, groups }) => (
	<div style={{ flex: 1 }}>
		{!loadingGroups && groups && groups.length === 0 ? <Redirect to="/group/new" /> : null}
		<h2 className="text-left">Your Groups</h2>
		{(loading || loadingGroups) ? <h3>Loading</h3> : null}
		<Link to="/group/new" className="btn btn-primary float-right" style={{ marginTop: '-2em' }}>New Group</Link>
		{!loadingGroups && groups ? <p style={{ textAlign: 'left' }}>You run {groups.length} groups</p> : null}
		<div className="groups-container">
			{groups && groups.map(group => <Group key={group.id} {...group} />)}
		</div>
	</div>
)

export default Groups