import login from './login'
import logout from './logout'
import user from './user'
import group from './group'
import member from './member'
import sendGroupIntroEmail from './sendGroupIntroEmail'
import {twitterGetRequestToken, twitterGetAccountInfo} from './twitter'

const mutations = {
	login,
	logout,
	user,
	group,
	member,
	sendGroupIntroEmail,
	twitterGetRequestToken,
	twitterGetAccountInfo,
}

export default mutations
