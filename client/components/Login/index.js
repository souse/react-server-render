import React, { Component } from 'react'
import { Link } from 'react-router-dom'

//import './index.less'

class Login extends Component {

	componentDidMount() {
		console.log('登录页面渲染完成......')
	}

	render() {
		return(
			<div>
				<p>这是登录页面</p>
				<Link to="/person">个人页面</Link>
			</div>
		)
	}
}

export default Login