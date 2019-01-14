import { connect } from 'react-redux'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'

import Signup from './Signup'

const login = gql`
	mutation login($emailAddress: String) {
		login(emailAddress: $emailAddress) {
			success
		}
	}
`

const mapStateToProps = state => ({
	accessToken: state.accessToken,
})

const SignupContainer = 
	compose(
		connect(mapStateToProps, {
		}),
		graphql(login, {
			props: ({ loading, mutate, ownProps }) => ({
				login: ({ emailAddress }) => mutate({
					variables: { emailAddress },
				}),
				loading,
			}),
		}),
	)(Signup)

export default SignupContainer
