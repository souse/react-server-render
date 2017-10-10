import {
	LOGIN_REQUEST,
	LOGIN_SUCCESS
} from '../actions/user'

/**
 * login
 * @param  {Object} state  [description]
 * @param  {[type]} action [description]
 * @return {[type]}        [description]
 */
const initialState = { isFetching: false, user: { } }

export default function auth(state = initialState, action) {
	switch(action.type) {
		case LOGIN_REQUEST:
			return { isFetching: true, user: { } }
		case LOGIN_SUCCESS:
			return {
				isFetching: false,
				user: action.user
			}
		default:
			return state
	}
}