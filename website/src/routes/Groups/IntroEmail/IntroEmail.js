import React from 'react'

class IntroEmail extends React.PureComponent {

	constructor(props) {
		super(props)
		this.state = {
			introEmailContent: '',
		}
	}

		

	render() {
		const { introEmailContent } = this.state

		return (
			<div>
				<h1>Write the intro email here</h1>
				<p>This will get sent to everyone in the group, with a link for them to fill in their profile.</p>
				<textarea placeholder="" value={introEmailContent || ''} onChange={e => this.setState({ introEmailContent: e.target.value })} />
				<div>
					<h4>Preview</h4>
					<div>{introEmailContent}</div>
				</div>
				<button>save</button>
				<button>save and send</button>
			</div>
		)
	}
}

export default IntroEmail