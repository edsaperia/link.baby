import React from 'react'
import { Link, Redirect } from 'react-router-dom'

class Member extends React.PureComponent {
	constructor(props) {
		super(props)
		this.state = {
			error: null,
			redirect: false,
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
		const { member: { firstName, lastName, description, optedIn } } = this.props

		this.setState({
			firstName,
			lastName,
			description,
			optedIn,
		})
	}
	
	updateMember() {
		const { firstName, lastName, description, optedIn } = this.state
		const { member: { id } } = this.props

		this.props.updateMember({ member: { id, firstName, lastName, description, optedIn } })
			.then(() => {
				this.setState({ redirect: true })
			}).catch(e => {
				this.setState({ error: true })
				console.error(e)
			})
	}

	render() {
		const { group } = this.props
		const { redirect, firstName, lastName, description, optedIn } = this.state

		return (
			<div>
				<h1>Tell us some more about yourself:</h1>
				<input placeholder="firstName" value={firstName || ''} onChange={e => this.setState({ firstName: e.target.value })} />
				<input placeholder="lastName" value={lastName || ''} onChange={e => this.setState({ lastName: e.target.value })} />
				<textarea placeholder="add a short description about yourself" value={description || ''} onChange={e => this.setState({ description: e.target.value })} />
				<p>Recieve a daily email with information of other people who are part of {group && group.title}</p>
				<input
					name="opted-in"
					type="checkbox"
					checked={!!optedIn}
					onChange={e => this.setState({ optedIn: !!e.target.checked }) } />
				<button onClick={() => this.updateMember()}>Save</button>
			</div>
		)
	}
}

export default Member