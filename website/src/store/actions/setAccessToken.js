import actionTypes from './actionTypes'

export const setAccessToken = ({ accessToken }) => ({
	type: actionTypes.SET_ACCESS_TOKEN,
	accessToken,
})