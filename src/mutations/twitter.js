import OAuth from 'oauth'

const oauth = new OAuth.OAuth(
	'https://api.twitter.com/oauth/request_token',
	'https://api.twitter.com/oauth/access_token',
	process.env.TWITTER_CONSUMER_KEY,
	process.env.TWITTER_CONSUMER_SECRET,
	'1.0A',
	null,
	'HMAC-SHA1'
)

const getRequestToken = ({ callbackUrl }) => new Promise((resolve, reject) => {
	oauth.getOAuthRequestToken({ oauth_callback: callbackUrl }, (error, token, secret, results) => {
		if (error) {
			reject(error)
		} else {
			resolve({ token, secret })
		}
	})
})

const getAccessToken = ({ token, secret, verifier }) => new Promise((resolve, reject) => {
	oauth.getOAuthAccessToken(token, secret, verifier, (error, accessToken, accessSecret, results) => {
		if (error) {
			reject(error)
		} else {
			resolve({ accessToken, accessSecret })
		}
	})
})

const getMe = ({ accessToken, accessSecret }) => new Promise((resolve, reject) => {
	oauth.get(
		'https://api.twitter.com/1.1/account/verify_credentials.json',
		accessToken,
		accessSecret,
		(e, data, res) => {
			if (e) {
				reject(e)
			} else {
				resolve(JSON.parse(data))
			}
		}
	)
})

export const twitterGetRequestToken = async (parent, { callbackUrl }, context) => {
	if (!(context.auth && context.auth.member) && !(context.auth && context.auth.user)) {
		throw new Error('unauthorized')
	}

	const { token, secret } = await getRequestToken({ callbackUrl })

	return {
		token,
		secret,
	}
}

export const twitterGetAccountInfo = async (parent, { token, secret, verifier }, context) => {
	if (!(context.auth && context.auth.member) && !(context.auth && context.auth.user)) {
		throw new Error('unauthorized')
	}

	const { accessToken, accessSecret } = await getAccessToken({ token, secret, verifier })

	const user = await getMe({ accessToken, accessSecret })

	const { id_str, profile_image_url_https, name, screen_name, description } = user

	return {
		id: id_str,
		username: screen_name,
		imageUrl: profile_image_url_https,
		firstName: name.split(' ')[0],
		lastName: name.split(' ')[1],
		description,
	}
}

