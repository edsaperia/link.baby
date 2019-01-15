import React from 'react'
import { Redirect, Link } from 'react-router-dom'

const Groups = ({ loading, loadingGroups, groups }) => (
	<div>
		{(loading || loadingGroups) ? <h3>loading</h3> : null}
		{!loadingGroups && groups ? <p>you have {groups.length} groups</p> : null}
		{!loadingGroups && groups && groups.length === 0 ? <Redirect to="/groups/new" /> : null}
		<ul>
			{groups && groups.map(group => <li key={group.id}>{group.title} - <Link to={`/groups/${group.id}`}>edit group</Link> - <Link to={`/groups/${group.id}/intro-email`}>edit intro email</Link></li>)}
		</ul>
	</div>
)

export default Groups