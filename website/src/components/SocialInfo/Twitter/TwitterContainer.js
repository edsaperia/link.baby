import { connect } from 'react-redux'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'

import Twitter from './Twitter'

const twitterGetRequestToken = gql`
	mutation twitterGetRequestToken($callbackUrl: String) {
		twitterGetRequestToken(callbackUrl: $callbackUrl) {
			token,
			secret
		}
	}
`

const twitterGetAccountInfo = gql`
	mutation twitterGetAccountInfo($token: String, $secret: String, $verifier: String) {
		twitterGetAccountInfo(token: $token, secret:$secret, verifier: $verifier) {
			id
			username
			imageUrl
			firstName
			lastName
			description
		}
	}
`

const mapStateToProps = state => ({
	accessToken: state.accessToken,
})

const TwitterContainer = 
	compose(
		connect(mapStateToProps, {
		}),
		graphql(twitterGetRequestToken, {
			props: ({ loading, mutate, ownProps }) => ({
				twitterGetRequestToken: (variables) => mutate({ variables }),
				loadingTwitterGetRequestToken: loading,
			}),
		}),
		graphql(twitterGetAccountInfo, {
			props: ({ loading, mutate, ownProps }) => ({
				twitterGetAccountInfo: (variables) => mutate({ variables }),
				loadingTwitterGetAccountInfo: loading,
			}),
		}),
	)(Twitter)

export default TwitterContainer
