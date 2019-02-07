import React from 'react'
import { Link, Redirect } from 'react-router-dom'

import SocialInfo from '../../../components/SocialInfo'
import Loading from '../../../components/Loading'

class Member extends React.PureComponent {
	constructor(props) {
		super(props)
		this.state = {
			error: null,
			redirect: false,
			optedIn: false,
		}
	}

	componentDidMount() {
		if (this.props.member) {
			this.populateFromProps()
		}
	}

	componentDidUpdate(prevProps) {
		if (!prevProps.member && this.props.member) {
			this.populateFromProps()
		}
	}

	populateFromProps() {
		const { member: { firstName, lastName, description, optedIn, imageUrl } } = this.props

		this.setState({
			firstName,
			lastName,
			description,
			optedIn,
			imageUrl,
		})
	}
	
	updateMember() {
		const { firstName, lastName, description, imageUrl, optedIn } = this.state
		const { member: { id } } = this.props

		this.props.updateMember({ member: { id, firstName, lastName, description, imageUrl, optedIn } })
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
		const { group, loadingGroup, loadingMember, loadingMemberUpdate } = this.props
		const loading = loadingGroup || loadingMember
		const { redirect, firstName, lastName, description, imageUrl, optedIn } = this.state

		return (
			<div className="route-container">
				<h2>Tell us more about yourself</h2>
				{loading ? <Loading /> : null}
				{imageUrl ? <img src={imageUrl} style={{ width: 'auto', height: 100 }} /> : null}
				<SocialInfo onChange={account => this.addSocial(account)} />
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
				<div className="form-group form-check">
					<input
						class="form-check-input"
						name="opted-in"
						type="checkbox"
						checked={optedIn}
						onChange={e => this.setState({ optedIn: !!e.target.checked }) }
					/>
					<label class="form-check-label">
						Recieve a daily introduction email to other people who are part of "{group && group.title}"
					</label>
				</div>
				<button className="btn btn-primary" disabled={loadingMemberUpdate} onClick={() => this.updateMember()}>Save Profile</button>
			</div>
		)
	}
}

export default Member