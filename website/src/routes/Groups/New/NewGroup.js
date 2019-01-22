import React from 'react'
import { Redirect } from 'react-router-dom'

class NewGroup extends React.PureComponent {
	constructor(props) {
		super(props)
		this.state = {
			redirectToGroupId: null,
		}
	}

	componentDidMount() {
		if (this.props.group) {
			this.populateFromProps()
		}
	}

	componentDidUpdate(prevProps) {
		if (!prevProps.group && this.props.group) {
			this.populateFromProps()
		}
	}

	populateFromProps() {
		const { group: { title, description, members } } = this.props

		this.setState({
			title,
			description,
			emailAddresses: members.map(member => member.emailAddress).join('\n'),
		})
	}

	newGroup() {
		const { title, description, emailAddresses } = this.state
		const group = {
			title,
			description,
			emailAddresses: emailAddresses.split('\n'),
		}

		if (this.props.group) {
			group.id = this.props.group.id
		}

		this.props.updateGroup({ group })
			.then(({ data: { group: { id } } }) => {
				this.setState({
					redirectToGroupId: id,
				})
			})
			.catch((e) => {
				console.error(e)
			})
	}

	render() {
		const { title, description, emailAddresses, redirectToGroupId } = this.state

		if (redirectToGroupId) {
			return <Redirect to={`/groups/${redirectToGroupId}/intro-email`} />
		}

		return (
			<form onSubmit={(e) => {
				e.preventDefault()
				this.newGroup()
				return false
			}} className="route-container">
				<div className="form-group">
					<h1>Tell us about your group</h1>
				</div>
				<div className="form-group">
					<label htmlFor="nameInput">Name</label>
					<input className="form-control" id="nameInput" aria-describedby="nameHelp" placeholder="Your Full Name" value={title || ''} onChange={e => this.setState({ title: e.target.value })} />
					<small id="nameHelp" className="form-text text-muted"></small>
				</div>
				<div className="form-group">
					<label htmlFor="nameInput">Description</label>
					<textarea className="form-control" id="nameInput" aria-describedby="nameHelp" placeholder="Your Full Name" value={description || ''} onChange={e => this.setState({ description: e.target.value })} />
					<small id="nameHelp" className="form-text text-muted">add a short description about the group</small>
				</div>
				<div className="form-group">
					<label>Add email addresses of the attendees (one per line)</label>
					<textarea className="form-control" placeholder={`someone@gmail.com\nsomeone.else@gmail.com`} value={emailAddresses || ''} onChange={e => this.setState({ emailAddresses: e.target.value })} />
					<small className="form-text text-muted">{emailAddresses ? `(found ${emailAddresses.split('\n').filter(a=>!!a.trim()).length})` : ''}&nbsp;</small>
				</div>
				<div className="form-group">
					<button onClick={() => this.newGroup()} className="btn btn-primary">Next: Write Intro Email</button>
				</div>
			</form>
		)
	}
}

export default NewGroup