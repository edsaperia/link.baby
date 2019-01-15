import React from 'react'
import { Redirect } from 'react-router-dom'

class NewGroup extends React.PureComponent {
	constructor(props) {
		super(props)
		this.state = {
			redirectToGroupId: null,

			// title: 'new group',
			// description: 'dajklsjdlas',
			// emailAddresses: ['josh2@joshbalfour.co.uk', 'josh3@joshbalfour.co.uk'].join('\n'),
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
			}}>
				<h1>Tell us about your group:</h1>
				<p>name</p>
				<input placeholder="name" value={title || ''} onChange={e => this.setState({ title: e.target.value })} />
				<p>add a short description about the group</p>
				<textarea placeholder="add a short description about the group" value={description || ''} onChange={e => this.setState({ description: e.target.value })} />
				<p>add email addresses of the attendees (one per line)</p>
				<textarea placeholder="add email addresses of the attendees (one per line)" value={emailAddresses || ''} onChange={e => this.setState({ emailAddresses: e.target.value })} />
				{emailAddresses ? <p>(found {emailAddresses.split('\n').filter(a=>!!a.trim()).length})</p> : <p />}
				<button onClick={() => this.newGroup()}>Next: Write Intro Email</button>
			</form>
		)
	}
}

export default NewGroup