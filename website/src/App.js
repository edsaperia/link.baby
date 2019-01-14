import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

import { BackendProvider } from './store/client'

import Home from './routes/Home'
import Signup from './routes/Signup'
import LoginPending from './routes/Login/Pending'
import LoginCallback from './routes/Login/Callback'

const App = () => (
	<BackendProvider>
		<Router>
			<div>
				<Route path="/" exact component={Home} />
				<Route path="/signup" isSignup exact component={Signup} />
				<Route path="/login" exact component={Signup} />
				<Route path="/login/pending" exact component={LoginPending} />
				<Route path="/login/callback" exact component={LoginCallback} />
			</div>
		</Router>
	</BackendProvider>
)

export default App