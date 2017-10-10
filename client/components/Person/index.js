import React, { Component } from 'react'
import { Link } from 'react-router-dom'


class Person extends Component {

	render() {
		return (
			<div>
				<p>person page</p>
				<Link to="/login">登录页面</Link>
			</div>
		)
	}
}

export default Person