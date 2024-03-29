import React from 'react'
import { TwitterLoginButton } from 'react-social-login-buttons'

class Twitter extends React.PureComponent {
	constructor(props) {
		super(props)
		this.state = {

		}
	}

	componentDidMount() {
		if (!window.location.origin) {
			window.location.origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port: '');
		}
	}

	login() {
		const twitterWindow = window.open('', '_blank', "width=600,height=400")
		const callbackUrl = `${window.location.origin}/login/twitter`

		this.props.twitterGetRequestToken({ callbackUrl })
			.then(({ data: { twitterGetRequestToken: { token, secret } } }) => {
				const url = `https://api.twitter.com/oauth/authenticate?oauth_token=${token}&callback_url=${encodeURIComponent(callbackUrl)}`

				window.twitterAuthCallback = (params) => {
					this.getAccessToken(params, secret)
				}

				twitterWindow.location.replace(url)
			})
			.catch(console.error)
	}

	getAccessToken({ oauth_token, oauth_verifier }, tokenSecret) {
		this.setState({ pending: true })

		this.props.twitterGetAccountInfo({
			token: oauth_token,
			verifier: oauth_verifier,
			secret: tokenSecret,
		}).then(({ data: { twitterGetAccountInfo } }) => {
			const { imageUrl } = twitterGetAccountInfo
			this.props.onChange(Object.assign({}, twitterGetAccountInfo, { imageUrl: imageUrl.split('_normal').join('') }))
		}).then(() => {
			this.setState({ pending: false })
		}).catch((e) => {
			console.error(e)
			this.setState({ pending: false })
		})
	}

	render() {
		const { pending } = this.state

		return (
			<div>
				<TwitterLoginButton size="45px" className="btn btn-blue" disabled={!!pending} onClick={() => { this.login() }}>Use Twitter Profile</TwitterLoginButton>
			</div>
		)
	}
}

export default Twitter