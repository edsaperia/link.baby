import React from 'react'
import { Link } from 'react-router-dom'

class IntroEmail extends React.PureComponent {

	constructor(props) {
		super(props)
		this.state = {
			introEmailContent: '',
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
		const { group: { introEmailContent } } = this.props

		this.setState({
			introEmailContent,
		})
	}

	save(thenSend) {
		const { introEmailContent } = this.state
		const group = {
			id: this.props.group.id,
			introEmailContent,
		}

		this.props.updateGroup({ group })
			.then(({ data: { group: { id } } }) => {
				this.setState({
					success: true,
				})
				if (thenSend) {
					if (this.props.group.members.length > 0) {
						return this.props.sendGroupIntroEmail({ groupId: id })
					} else {
						alert("please add email addresses to your group first")
					}
				}
			})
			.catch((e) => {
				console.error(e)
			})
	}

	render() {
		const { group } = this.props
		const { introEmailContent, success } = this.state

		return (
			<div>
				<h3>{group && group.title}</h3>
				<h1>Write the intro email here</h1>
				<p>This will get sent to everyone in the group, with a link for them to fill in their profile.</p>
				<textarea placeholder="" value={introEmailContent || ''} onChange={e => this.setState({ introEmailContent: e.target.value })} />
				<div>
					<h4>Preview</h4>
					<div>{introEmailContent}</div>
				</div>
				<p>{success ? 'saved' : null}</p>
				<button onClick={() => this.save()}>save draft</button>
				<button onClick={() => this.save(true)}>save and send to {group ? group.members.length : null} people</button>
			</div>
		)
	}
}

export default IntroEmail