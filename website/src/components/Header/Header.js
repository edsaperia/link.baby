import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { client } from '../../store/client'

const Header = ({ accessToken, member, user, setAccessToken }) => (
	<header className="masthead">
		<div className="inner clearfix p-3 d-absolute nav-container">
			<h3 className="masthead-brand">
				<Link className="masthead-brand" to="/">link.baby</Link>
			</h3>
			<nav className="nav nav-masthead justify-content-center">
				<NavLink className="nav-link" to="/">Home</NavLink>
				{user ? <NavLink className="nav-link" to="/groups">My Groups</NavLink> : null}
				{user ? <NavLink className="nav-link" to="/signup/profile">My Profile</NavLink> : null}
				{member ? <NavLink className="nav-link" to="/login/callback">My Group</NavLink> : null}
				{!accessToken ? <NavLink className="nav-link" to="/login">Login</NavLink> : <NavLink onClick={() => {
					setAccessToken({ accessToken: null })
					client.resetStore()
				}} className="nav-link" to="/">Logout</NavLink>}
			</nav>
		</div>
	</header>
)

export default Header