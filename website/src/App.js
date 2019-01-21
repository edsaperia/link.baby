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
				<Route path="/login/twitter" exact component={TwitterLogin} />

				<Route path="/groups" exact component={Groups} />
				<Route path="/groups/new" exact component={NewGroup} />
				<Route path="/groups/:id" exact component={NewGroup} />
				<Route path="/groups/:id/intro-email" exact component={GroupIntroEmail} />
				<Route path="/groups/:id/member" exact component={Member} />
			</div>
		</Router>
	</BackendProvider>
)

export default App