import { connect } from 'react-redux'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'

import Member from './Member'

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

const updateMember = gql`
	mutation updateMember($member: MemberInput) {
		member(member: $member) {
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
`

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

const MemberContainer = 
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
					loadingGroup: loading,
				})
			},
			options: ownProps => ({ variables: { id: ownProps.match.params.id } }),
			skip: ownProps => {
				return !ownProps.accessToken || !ownProps.match.params.id
			}
		}),
		graphql(getActor, {
			props: ({ data: { loading, actor, refetch, error }, ownProps }) => {
				const member = actor && actor.member

				if (error) {
					console.error(error)
				}

				return ({
					member,
					loadingMember: loading,
				})
			},
			skip: ownProps => {
				return !ownProps.accessToken
			}
		}),
		graphql(updateMember, {
			props: ({ loading, mutate, ownProps }) => ({
				updateMember: ({ member }) => mutate({
					variables: { member },
					update: (proxy, { data }) => {
						const { member } = data
						const { actor } = proxy.readQuery({ query: getActor })
						proxy.writeQuery({ query: getActor, variables: { id: d.id }, data: { actor: Object.assign({}, actor, { member }) } })
					},
				}),
				loadingMemberUpdate: loading,
			}),
		}),
	)(Member)

export default MemberContainer
