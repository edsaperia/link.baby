import React from 'react'
import { Redirect, Link } from 'react-router-dom'

const Group = ({ id, title, description, members }) => (
	<div className="card" style={{ flex: 1, marginBottom: '2rem' }}>
		<div className="card-body">
			<h5 className="card-title">{title}</h5>
			<h6 className="card-subtitle mb-2 text-muted">{members.length} members</h6>
			<p className="card-text">{description}</p>
			<Link to={`/groups/${id}`} className="card-link">edit group</Link>
			<Link to={`/groups/${id}/intro-email`} className="card-link">edit intro email</Link>
		</div>
	</div>
)

const Groups = ({ loading, loadingGroups, groups }) => (
	<div style={{ flex: 1 }}>
		{(loading || loadingGroups) ? <h3>loading</h3> : null}
		{!loadingGroups && groups ? <p>you have {groups.length} groups</p> : null}
		{!loadingGroups && groups && groups.length === 0 ? <Redirect to="/groups/new" /> : null}
		<div className="groups-container">
			{groups && groups.map(group => <Group key={group.id} {...group} />)}
		</div>
	</div>
)

export default Groups