import React from 'react'

class TwitterLogin extends React.PureComponent {
	componentDidMount() {
		const params = [...new URLSearchParams(this.props.location.search).entries()].reduce((q, [k, v]) => Object.assign(q, {[k]: v}), {})
		if (window.opener) {
			window.opener.twitterAuthCallback(params)
		}
		window.close()
	}

	render() {
		return <div />
	}
}

export default TwitterLogin