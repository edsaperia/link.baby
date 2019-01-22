import { connect } from 'react-redux'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'
import { setAccessToken } from '../../store/actions/setAccessToken'

import Header from './Header'

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
				optedIn
			}
		}
	}
`

const mapStateToProps = state => ({
	accessToken: state.accessToken,
})

const HeaderContainer = 
	compose(
		connect(mapStateToProps, {
			setAccessToken,
		}),
		graphql(getActor, {
			props: ({ data: { loading, actor, refetch, error }, ownProps }) => {
				const member = actor && actor.member
				const user = actor && actor.user

				if (error) {
					console.error(error)
				}

				return ({
					member,
					user,
					loadingActor: loading,
				})
			},
			skip: ownProps => {
				return !ownProps.accessToken
			}
		}),
	)(Header)

export default HeaderContainer
