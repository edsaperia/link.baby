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

	getEmails() {
		const { emailAddresses = '' } = this.state
		const reg = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g

		return (emailAddresses.match(reg) || []).filter(a=>!!a.trim())
	}

	populateFromProps() {
		const { group: { title, description, members, organiserName } } = this.props

		this.setState({
			title,
			description,
			organiserName,
			emailAddresses: members.map(member => member.emailAddress).join('\n'),
		})
	}

	newGroup() {
		const { title, description, emailAddresses, organiserName } = this.state
		const group = {
			title,
			description,
			organiserName,
			emailAddresses: this.getEmails(),
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
		const { loading } = this.props
		const { title, description, emailAddresses, redirectToGroupId, organiserName } = this.state
		const existingGroupId = this.props.group && this.props.group.id

		const newEmailAddressesCount = this.props.group ? (this.getEmails().length - this.props.group.members.length) : 0
		const hasSentIntro = this.props.group && this.props.group.introEmailSentAt

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
					<label htmlFor="nameInput">Group Name</label>
					<input className="form-control" id="nameInput" aria-describedby="nameHelp" placeholder="Group Name" value={title || ''} onChange={e => this.setState({ title: e.target.value })} />
					<small id="nameHelp" className="form-text text-muted"></small>
				</div>
				<div className="form-group">
					<label htmlFor="orgnameInput">Your Name</label>
					<input className="form-control" id="orgnameInput" aria-describedby="nameHelp" placeholder="Your Full Name" value={organiserName || ''} onChange={e => this.setState({ organiserName: e.target.value })} />
					<small id="orgnameHelp" className="form-text text-muted">The name people in this group know you by</small>
				</div>
				<div className="form-group">
					<label>Add email addresses of the attendees (one per line)</label>
					<textarea className="form-control" placeholder={`someone@gmail.com\nsomeone.else@gmail.com`} value={emailAddresses || ''} onChange={e => this.setState({ emailAddresses: e.target.value })} />
					<small className="form-text text-muted">{this.getEmails().length > 0 ? `(found ${this.getEmails().length})` : ''}&nbsp;</small>
				</div>
				<div className="form-group">
					<label className="muted">{(hasSentIntro && newEmailAddressesCount > 0) ? `You added ${newEmailAddressesCount} extra people. They will automatically get the intro email when you hit save.` : ''}</label>
				</div>
				<div className="form-group">
					<button className="btn btn-primary" disabled={loading}>{existingGroupId ? 'Save' : 'Next: Write Intro Email'}</button>
				</div>
			</form>
		)
	}
}

export default NewGroup