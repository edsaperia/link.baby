import express from 'express'
import fs from 'fs'
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express'
import cors from 'cors'
import { createServer } from 'http'
import { PubSub } from 'graphql-subscriptions'
import ApolloClient from 'apollo-boost'
import fetch from 'node-fetch'
import gql from 'graphql-tag'

import bodyParser from 'body-parser'
import { importSchema } from 'graphql-import'
import { makeExecutableSchema } from 'graphql-tools'
import { SubscriptionServer } from 'subscriptions-transport-ws'
import { execute, subscribe } from 'graphql'
import request from 'request-promise-native'

import events from './src/events'
import queries from './src/queries'
import mutations from './src/mutations'

import Token from './src/models/Token'

import dailyScheduled from './src/scheduled/daily'

const resolvers = {
	Query: queries,
	Mutation: mutations,
}

const PORT = process.env.PORT || 3000

const app = express()

const schemaStr = fs.readFileSync('schema.graphql', 'utf-8')

const typeDefs = importSchema(schemaStr)

const schema = makeExecutableSchema({
	typeDefs,
	resolvers,
})

const authMiddleware = (req, res, next) => {
	const token = req.headers.authorization && req.headers.authorization.split('Bearer ')[1]
	if (token) {
		Token.getUser({ token }).then(({ member, user }) => {
			req.auth = {
				user,
				token,
				member,
			}
			next()
		}).catch(e => {
			throw e
		})
	} else {
		next()
	}
}

app.use('*', cors({ origin: '*' }))

const emit = ({ auth }) => async ({ type, data }) => {
	if (events[type]) {
		await events[type](Object.assign({}, data, { auth }))
			.then(console.log)
			.catch(console.error)
	} else {
		console.error(`unhandled event ${type}`)
	}
}

app.use('/graphql',
	bodyParser.json(),
	authMiddleware,
	graphqlExpress((req) => ({
		schema,
		// formatResponse: formatResponse.bind(logOptions),
		// formatError,
		context: () => {
			// console.log('local req', req)
			let auth = req.auth
			// if (req) {
			// 	auth = req.auth
			// } else {
			// 	console.log('connection.connectionParams', connection.connectionParams)
			// 	auth = connection.connectionParams
			// }

			return ({
				auth,
				emit: emit({ auth }),
			})
		},
	})))

app.get('/graphiql', graphiqlExpress({
	endpointURL: process.env.PUBLIC_GRAPHQL_URL,
}))

app.get('/prod-graphiql', graphiqlExpress({
	endpointURL: 'https://kadr3ldmcngm3futskts6xxehe.appsync-api.eu-west-1.amazonaws.com/graphql',
}))

// app.listen(PORT, () => console.log(`GraphQL listening on ${PORT}`))

app.listen(PORT, () => {
	console.log(`Apollo Server is now running on ${process.env.PUBLIC_GRAPHQL_URL}`)
})

// dailyScheduled({ emit: emit({}) }).then(console.log).catch(console.error)
