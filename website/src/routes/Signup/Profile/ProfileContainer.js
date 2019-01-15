import { connect } from 'react-redux'
import Profile from './Profile'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'

const getMe = gql`
	query getMe {
		users(id:"me") {
			id
			firstName
			lastName
			description
			imageUrl
		}
	}
`

const updateUser = gql`
	mutation updateUser($user: UserInput) {
		user(user: $user) {
			id
			firstName
			lastName
			description
			imageUrl
		}
	}
`

const mapStateToProps = state => ({
	accessToken: state.accessToken,
})

const ProfileContainer = 
	compose(
		connect(mapStateToProps, {
		}),
		graphql(getMe, {
			props: ({ data: { loading, users, refetch, error }, ownProps }) => {
				const user = (users && users[0]) || {}
				if (error) {
					console.error(error)
				}
				return ({
					...user,
					loading,
					refetch,
				})
			},
			skip: ownProps => {
				return !ownProps.accessToken
			}
		}),
		graphql(updateUser, {
			props: ({ loading, mutate, ownProps }) => ({
				updateUser: ({ id, firstName, lastName, imageUrl, description }) => mutate({
					variables: { user: { id, firstName, lastName, imageUrl, description } },
					update: (proxy, { data }) => {
						const { user } = data
						const d = {
							users: [user]
						}
						proxy.writeQuery({ query: getMe, data: d })
					},
				}),
				loading: loading || ownProps.loading,
			}),
		}),
	)(Profile)

export default ProfileContainer
