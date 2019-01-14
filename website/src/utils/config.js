import config from './config.json'
// let backendConfig = null

// const checkStatus = response => {
// 	if (response.ok) {
// 		return response
// 	}

// 	const error = new Error(response.statusText)
// 	error.response = response

// 	return Promise.reject(error)
// }

// const fetchJson = (url, config = {}) =>
// 	fetch(url, config)
// 		.then(checkStatus)
// 		.then(function(res){ return res.text() })
// 		.then(function(text){ return JSON.parse(text) })

export const getConfig = () => {
	// // if (!backendConfig) {
	// // 	backendConfig = await fetchJson('/config.json')
	// // }

	// return backendConfig

	return config
}

