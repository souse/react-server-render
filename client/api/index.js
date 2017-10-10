import fetch from 'isomorphic-fetch'

export function authorize(user) {
	const { name, password } = user;

	return fetch(`http://www.reddit.com/r/reactjs.json`)
            .then(response => response.json())
            .then(json => {
            	return { name: 'tomcat', age: 12, sex: '女', token: 'uudf8dfd0' }
            })
}

