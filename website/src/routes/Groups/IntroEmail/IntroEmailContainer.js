import { connect } from 'react-redux'
import IntroEmail from './IntroEmail'
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

const sendGroupIntroEmail = gql`
	mutation sendGroupIntroEmail($groupId: ID!) {
		sendGroupIntroEmail(groupId: $groupId) {
			${groupFields}
		}
	}
`

const mapStateToProps = state => ({
	accessToken: state.accessToken,
})

const IntroEmailContainer = 
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
		graphql(sendGroupIntroEmail, {
			props: ({ loading, mutate, ownProps }) => ({
				sendGroupIntroEmail: ({ groupId }) => mutate({
					variables: { groupId },
					update: (proxy, { data }) => {
						const { sendGroupIntroEmail } = data
						const d = {
							groups: [sendGroupIntroEmail]
						}
						proxy.writeQuery({ query: getGroup, variables: { id: d.id }, data: d })
					},
				}),
				loading: loading || ownProps.loading,
			}),
		}),
	)(IntroEmail)

export default IntroEmailContainer
