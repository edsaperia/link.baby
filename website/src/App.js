import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

import { BackendProvider } from './store/client'

import Home from './routes/Home'
import Signup from './routes/Signup'
import LoginPending from './routes/Login/Pending'
import LoginCallback from './routes/Login/Callback'
import SignupProfile from './routes/Signup/Profile'
import Groups from './routes/Groups'
import NewGroup from './routes/Groups/New'
import GroupIntroEmail from './routes/Groups/IntroEmail'

const App = () => (
	<BackendProvider>
		<Router>
			<div>
				<Route path="/" exact component={Home} />
				<Route path="/signup" isSignup exact component={Signup} />
				<Route path="/signup/profile" exact component={SignupProfile} />
				<Route path="/login" exact component={Signup} />
				<Route path="/login/pending" exact component={LoginPending} />
				<Route path="/login/callback" exact component={LoginCallback} />
				<Route path="/groups" exact component={Groups} />
				<Route path="/groups/new" exact component={NewGroup} />
				<Route path="/groups/:id/intro-email" exact component={GroupIntroEmail} />
				<Route path="/groups/:id" exact component={NewGroup} />
			</div>
		</Router>
	</BackendProvider>
)

export default App