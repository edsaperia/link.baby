import React from 'react'
import { Link, Redirect } from 'react-router-dom'

import Loading from '../../../components/Loading'

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
			}).then(() => {
				if (thenSend) {
					this.setState({ redirectToSuccessGroupId: group.id })
				}
			})
			.catch((e) => {
				console.error(e)
			})
	}

	render() {
		const { group, loading } = this.props
		const { introEmailContent, success, redirectToSuccessGroupId } = this.state

		if (redirectToSuccessGroupId) {
			return <Redirect to={`/groups/${redirectToSuccessGroupId}/success`} />
		}

		return (
			<div style={{ minWidth: 700 }}>
				<h3 className="text-left mb-3">{group && group.title}</h3>
				<h1 className="text-left">Write the intro email here</h1>
				{loading ? <Loading /> : null}
				<div className="mt-5 mb-3" style={{ display: 'flex', flexDirection: 'row', minHeight: 400 }}>
					<div style={{ flex: 1 }}>
						<label>This will get sent to everyone in the group, with a link for them to fill in their profile.</label>
						<textarea style={{ minHeight: 350 }} className="form-control" placeholder="" value={introEmailContent || ''} onChange={e => this.setState({ introEmailContent: e.target.value })} />
					</div>
					<div className="ml-5" style={{ flex: 1, textAlign: 'left' }}>
						<h4 className="mb-4">Preview</h4>
						<div>{introEmailContent}</div>
					</div>
				</div>
				<div className="mt-3" style={{ textAlign: 'left' }}>
					<p>{success ? 'saved' : null}</p>
					<button className="btn btn-outline-secondary mr-2" onClick={() => this.save()}>save draft</button>
					<button className="btn btn-primary" onClick={() => this.save(true)}>save and send to {group ? group.members.length : null} people</button>
				</div>
			</div>
		)
	}
}

export default IntroEmail