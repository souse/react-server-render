import { take, put, call, fork, select } from 'redux-saga/effects'
import { push } from 'react-router-redux'
import * as actions from 'ACTION/user'
import * as Api from 'API'
import { history } from '../store/configureStore'

function* authorize(user) {
	try{
		const token = yield call(Api.authorize, user)

		yield put({ type: 'LOGIN_SUCCESS', user: token })
		// yield call(history.push, '/person')
		yield put(push('/person'));
	}catch(error) {
		console.log(error)
		yield put({ type: 'LOGIN_ERROR', error})
	}
} 

export function* loginFlow() {
	while(true) {
		const { user } = yield take('LOGIN_REQUEST')
		
		yield fork(authorize, user)
		yield take(['LOGIN_OUT', 'LOGIN_ERROR'])
	}	
}

export default function* root() {
	yield call(loginFlow)
}

