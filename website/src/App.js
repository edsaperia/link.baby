import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

import { BackendProvider } from './store/client'

import Home from './routes/Home'

import Signup from './routes/Signup'
import SignupProfile from './routes/Signup/Profile'

import LoginPending from './routes/Login/Pending'
import LoginCallback from './routes/Login/Callback'
import TwitterLogin from './routes/Login/TwitterLogin'

import Groups from './routes/Groups'
import NewGroup from './routes/Groups/New'
import GroupIntroEmail from './routes/Groups/IntroEmail'
import Member from './routes/Groups/Member'

import Header from './components/Header'

const App = () => (
	<BackendProvider>
		<Router>
			<div className="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column text-center">
				<Header />
				<main role="main" className="inner cover">
					<div id="app">
						
							<div>
								<Route path="/" exact component={Home} />

								<Route path="/signup" isSignup exact component={Signup} />
								<Route path="/signup/profile" exact component={SignupProfile} />

								<Route path="/login" exact component={Signup} />
								<Route path="/login/pending" exact component={LoginPending} />
								<Route path="/login/callback" exact component={LoginCallback} />
								<Route path="/login/twitter" exact component={TwitterLogin} />

								<Route path="/groups" exact component={Groups} />
								<Route path="/groups/new" exact component={NewGroup} />
								<Route path="/groups/:id" exact component={NewGroup} />
								<Route path="/groups/:id/intro-email" exact component={GroupIntroEmail} />
								<Route path="/groups/:id/member" exact component={Member} />
							</div>
						
					</div>
				</main>
			</div>
		</Router>
		<footer className="mastfoot mt-auto">
			<div className="inner">
				<p>&copy; <a href="https://edsaperia.com">Ed Saperia</a> 2019 ∙ Created by <a href="https://joshbalfour.co.uk/">Josh Balfour</a> ∙ <a href="/privacy.html">Privacy</a> ∙ <a href="/terms.html">Terms of Use</a></p>
			</div>
		</footer>
	</BackendProvider>
)

export default App