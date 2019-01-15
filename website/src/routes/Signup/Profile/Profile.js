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

	componentDidMount() {
		this.populateFromProps()
	}

	componentDidUpdate(prevProps) {
		if (!prevProps.id && this.props.id) {
			this.populateFromProps()
		}
	}

	populateFromProps() {
		const { firstName, lastName, description } = this.props

		this.setState({
			firstName,
			lastName,
			description,
		})
	}
	
	updateUser() {
		const { firstName, lastName, description } = this.state
		const { id } = this.props

		this.props.updateUser({ id, firstName, lastName, description })
			.then(() => {
				this.setState({ redirect: true })
			}).catch(e => {
				this.setState({ error: true })
				console.error(e)
			})
	}

	render() {
		const { redirect, firstName, lastName, description } = this.state

		if (redirect) {
			return <Redirect to="/groups" />
		}

		return (
			<div>
				<h1>Tell us some more about yourself:</h1>
				<p>This will be shown to people who get emails from you</p>
				<input placeholder="firstName" value={firstName || ''} onChange={e => this.setState({ firstName: e.target.value })} />
				<input placeholder="lastName" value={lastName || ''} onChange={e => this.setState({ lastName: e.target.value })} />
				<textarea placeholder="add a short description about yourself" value={description || ''} onChange={e => this.setState({ description: e.target.value })} />
				<button onClick={() => this.updateUser()}>Next</button>
			</div>
		)
	}
}

export default Signup