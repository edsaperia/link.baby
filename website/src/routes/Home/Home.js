import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => (
	<div className="home-container">
		<div className="home-section border-none">
			<div className="home-section-content">
				<div className="logo logo-light" />
				<h1 className="cover-heading">Link Baby</h1>
				<p className="lead">Keep the Conversation Going</p>
				<Link to="/signup" className="btn btn-lg btn-primary">Get Started</Link>
			</div>
		</div>
		<div className="home-section">
			<div className="home-section-content">
				<h1>Explainer</h1>
				<p>Content here</p>
			</div>
		</div>
	</div>
)

export default Home