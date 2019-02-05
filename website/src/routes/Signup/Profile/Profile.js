import React from 'react'
import { Link, Redirect } from 'react-router-dom'

import SocialInfo from '../../../components/SocialInfo'

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
		const { firstName, lastName, description, imageUrl } = this.props

		this.setState({
			firstName,
			lastName,
			description,
			imageUrl,
		})
	}
	
	updateUser() {
		const { firstName, lastName, description, imageUrl } = this.state
		const { id } = this.props

		this.props.updateUser({ id, firstName, lastName, description, imageUrl })
			.then(() => {
				this.setState({ redirect: true })
			}).catch(e => {
				this.setState({ error: true })
				console.error(e)
			})
	}

	addSocial(account) {
		const { firstName, lastName, description, imageUrl } = account
		this.setState({
			firstName,
			lastName,
			description,
			imageUrl,
		})
	}

	render() {
		const { redirect, imageUrl, firstName, lastName, description } = this.state

		if (redirect) {
			return <Redirect to="/groups" />
		}

		return (
			<div className="route-container">
				<h2>Tell us some more about yourself:</h2>
				<p>This will be shown to people who get emails from you</p>
				<SocialInfo onChange={account => this.addSocial(account)} />
				{imageUrl ? <img src={imageUrl} style={{ width: 'auto', height: 100 }} /> : null}
				<div className="form-group">
					<label>First Name:</label>
					<input className="form-control" placeholder="First Name" value={firstName || ''} onChange={e => this.setState({ firstName: e.target.value })} />
				</div>
				<div className="form-group">
					<label>Last Name:</label>
					<input className="form-control" placeholder="Last Name" value={lastName || ''} onChange={e => this.setState({ lastName: e.target.value })} />
				</div>
				<div className="form-group">
					<label>Bio:</label>
					<textarea className="form-control" placeholder="Add a short description about yourself" value={description || ''} onChange={e => this.setState({ description: e.target.value })} />
				</div>
				<button className="btn btn-primary" onClick={() => this.updateUser()}>Save Profile</button>
			</div>
		)
	}
}

export default Signup