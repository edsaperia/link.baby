import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => (
	<div className="route-container">
		<div className="logo" />
		<h1 className="cover-heading">Link Baby</h1>
		<p className="lead">Stay Connected™️</p>
		<Link to="/signup" className="btn btn-lg btn-secondary">Get Started</Link>
	</div>
)

export default Home