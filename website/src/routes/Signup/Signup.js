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
		if (!!emailAddress.trim()) {
			this.props.login({ emailAddress })
				.then(() => {
					this.setState({ redirect: true })
				}).catch(e => {
					this.setState({ error: true })
					console.error(e)
				})
		}
	}

	render() {
		const { redirect } = this.state
		const { isSignup } = this.props

		if (redirect) {
			return <Redirect to="/login/pending" />
		}

		return (
			<form onSubmit={(e) => {
				e.preventDefault()
				this.login()
				return false
			}} className="route-container">
				<h3>We just need your email:</h3>
				<div className="form-group">
					<input placeholder="email address" className="form-control" type="email" id="emailInput" name="email" ref={r => this.emailInput = r} />
					<small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
				</div>
				<button type="submit" className="btn btn-primary" onClick={() => this.login()}>Next</button>
			</form>
		)
	}
}

export default Signup