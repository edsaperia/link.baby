import React from 'react'
import Twitter from './Twitter'

class SocialInfo extends React.PureComponent {
	constructor(props) {
		super(props)
		this.state = {}
	}

	onAccountChange(accountType, account) {
		this.props.onChange(account)
	}

	render() {
		return (
			<div>
				<Twitter onChange={account => this.onAccountChange('twitter', account)} />
			</div>
		)
	}
}

export default SocialInfo