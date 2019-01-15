import { connect } from 'react-redux'
import Groups from './Groups'
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

const getMyGroups = gql`
	query getMyGroups {
		groups(ownerUserId:"me") {
			id
			title
			description
			introEmailContent
			ownerUser {
				id
				firstName
				lastName
				description
				imageUrl
			}
			members {
				id
				emailAddress
				firstName
				lastName
				imageUrl
				description
			}
		}
	}
`

const mapStateToProps = state => ({
	accessToken: state.accessToken,
})

const GroupsContainer = 
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
					user,
					loading,
					refetch,
				})
			},
			skip: ownProps => {
				return !ownProps.accessToken
			}
		}),
		graphql(getMyGroups, {
			props: ({ data: { loading, groups, refetch, error }, ownProps }) => {
				if (error) {
					console.error(error)
				}

				return ({
					groups,
					loadingGroups: loading,
					refetch,
				})
			},
			skip: ownProps => {
				return !ownProps.accessToken
			}
		}),
	)(Groups)

export default GroupsContainer
