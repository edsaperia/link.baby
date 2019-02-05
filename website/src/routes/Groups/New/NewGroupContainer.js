import { connect } from 'react-redux'
import NewGroup from './NewGroup'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'

const groupFields = `
	id,
	title,
	description,
	introEmailContent,
	ownerUser {
		id
		firstName
		lastName
		description
		imageUrl
	},
	introEmailSentAt
	members {
		id
		firstName
		lastName
		description
		imageUrl
		emailAddress
	}
`

const getGroup = gql`
	query getGroup($id: ID!) {
		groups(id: $id) {
			${groupFields}
		}
	}
`

const updateGroup = gql`
	mutation updateGroup($group: GroupInput) {
		group(group: $group) {
			${groupFields}
		}
	}
`

const mapStateToProps = state => ({
	accessToken: state.accessToken,
})

const NewGroupContainer = 
	compose(
		connect(mapStateToProps, {
		}),
		graphql(getGroup, {
			props: ({ data: { loading, groups, refetch, error }, ownProps }) => {
				const group = (groups && groups[0])

				if (error) {
					console.error(error)
				}

				return ({
					group,
					loading,
					refetch,
				})
			},
			options: ownProps => ({ variables: { id: ownProps.match.params.id } }),
			skip: ownProps => {
				return !ownProps.accessToken || !ownProps.match.params.id
			}
		}),
		graphql(updateGroup, {
			props: ({ loading, mutate, ownProps }) => ({
				updateGroup: ({ group }) => mutate({
					variables: { group },
					update: (proxy, { data }) => {
						const { group } = data
						const d = {
							groups: [group]
						}
						proxy.writeQuery({ query: getGroup, variables: { id: d.id }, data: d })
					},
				}),
				loading: loading || ownProps.loading,
			}),
		}),
	)(NewGroup)

export default NewGroupContainer
