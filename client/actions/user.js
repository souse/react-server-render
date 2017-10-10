export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'

export const requestUser = user => {
	return {
		type: LOGIN_REQUEST,
		user
	}
}

export const receiveUser = user => {
	return {
		type: LOGIN_SUCCESS,
		user
	}
}