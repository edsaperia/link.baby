import React from 'react'
import ReactDOM from 'react-dom'

import App from './App'

import { ensureAccessToken } from './utils/persistentAccessToken'

ensureAccessToken()

ReactDOM.render(
	<App />,
	document.querySelectorAll('*[react-root]')[0]
)

module.hot.accept()