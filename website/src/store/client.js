import React from 'react'
import { setContext } from 'apollo-link-context'
import { ApolloLink, split } from 'apollo-link'
import { createHttpLink } from 'apollo-link-http'
import { ApolloClient } from 'apollo-client'
import { ApolloProvider } from 'react-apollo'
import { Provider } from 'react-redux'
import { InMemoryCache } from 'apollo-cache-inmemory'

import { getConfig } from '../utils/config'
import store from './store'

const stage = window.location.hostname === 'localhost' ? 'local' : 'production'

const getAccessToken = () => store.getState().accessToken

const cache = new InMemoryCache()

const link = ApolloLink.from([
	setContext(async (request, previousContext) => {
		const accessToken = getAccessToken(request)
		const backendConfig = getConfig()

		if (accessToken) {
			return ({
				headers: {
					...previousContext.headers,
					'X-API-KEY': backendConfig[stage].graphql.token,
					'Authorization': `Bearer ${accessToken}`,
				}
			})
		}

		return ({
			headers: {
				...previousContext.headers,
				'X-API-KEY': backendConfig[stage].graphql.token,
			}
		})
	}),
	createHttpLink({
		uri: () => {
			const backendConfig = getConfig()
			return backendConfig[stage].graphql.url
		},
	})
])

export const client = new ApolloClient({
	link,
	cache,
})

export const BackendProvider = ({ children }) => (
	<Provider store={store}>
		<ApolloProvider client={client}>
			{children}
		</ApolloProvider>
	</Provider>
)
