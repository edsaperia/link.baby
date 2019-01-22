import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => (
	<div className="route-container">
		<div className="home-section p-0 border-none">
			<div className="logo" />
			<h1 className="cover-heading">Link Baby</h1>
			<p className="lead">Stay Connected™️</p>
			<Link to="/signup" className="btn btn-lg btn-primary">Get Started</Link>
		</div>
		<div className="home-section">
			<h1 className="cover-heading">Explainer</h1>
			<p className="lead">Content here</p>
		</div>
	</div>
)

export default Home