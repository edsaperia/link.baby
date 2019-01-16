import { connect } from 'react-redux'
import LoginCallback from './LoginCallback'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'

const getActor = gql`
	query getActor {
		actor {
			accessToken,
			user {
				id
				firstName
				lastName
				description
				imageUrl
			}
			member {
				id
				firstName
				lastName
				description
				imageUrl
				emailAddress
				groupId
			}
		}
	}
`

const mapStateToProps = state => ({
	accessToken: state.accessToken,
})

const LoginCallbackContainer = 
	compose(
		connect(mapStateToProps, {
		}),
		graphql(getActor, {
			props: ({ data: { loading, actor, refetch, error }, ownProps }) => {
				if (error) {
					console.error(error)
				}

				return ({
					actor,
					loading,
					refetch,
				})
			},
			skip: ownProps => {
				return !ownProps.accessToken
			}
		}),
	)(LoginCallback)

export default LoginCallbackContainer
