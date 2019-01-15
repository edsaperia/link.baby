import React from 'react'
import { Link, Redirect } from 'react-router-dom'

class Signup extends React.PureComponent {
	constructor(props) {
		super(props)
		this.state = {
			error: null,
			redirect: false,
		}
	}
	
	login() {
		const emailAddress = this.emailInput.value
		this.props.login({ emailAddress })
			.then(() => {
				this.setState({ redirect: true })
			}).catch(e => {
				this.setState({ error: true })
				console.error(e)
			})
	}

	renderLogin() {
		return (
			<form onSubmit={(e) => {
				e.preventDefault()
				this.login()
				return false
			}}>
				<h1>Enter your email:</h1>
				<input placeholder="email" type="email" name="email" ref={r => this.emailInput = r} />
				<button onClick={() => this.login()}>Login</button>
			</form>
		)
	}

	render() {
		const { redirect } = this.state
		const { isSignup } = this.props

		if (redirect) {
			return <Redirect to="/login/pending" />
		}

		if (!isSignup) {
			return this.renderLogin()
		}

		return (
			<form onSubmit={(e) => {
				e.preventDefault()
				this.login()
				return false
			}}>
				<h1>To get started we just need your email:</h1>
				<input placeholder="email" type="email" name="email" ref={r => this.emailInput = r} />
				<button onClick={() => this.login()}>Sign up</button>
			</form>
		)
	}
}

export default Signup