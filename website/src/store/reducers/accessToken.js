import actionTypes from '../actions/actionTypes'

export const accessToken = (state = null, action) => {
	if (action.type === actionTypes.SET_ACCESS_TOKEN) {
		return action.accessToken
	}

	return state
}