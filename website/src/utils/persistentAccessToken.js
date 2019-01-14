import store from '../store/store'
import { setAccessToken } from '../store/actions/setAccessToken'

const urlParams = new URLSearchParams(location.search)

const persistParam = (param) => {
	if (urlParams.has(param)) {
		window.localStorage.setItem(param, urlParams.get(param))
	}

	return window.localStorage.getItem(param)
}

export const getAccessToken = () => persistParam('accessToken')

export const ensureAccessToken = () => store.dispatch(setAccessToken({ accessToken: getAccessToken() }))