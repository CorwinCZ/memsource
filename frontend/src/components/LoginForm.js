import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';


class LoginForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			userName: '',
			password: '',
			error: false,
		}
		this.handleUserName = this.handleUserName.bind(this);
		this.handlePassword = this.handlePassword.bind(this);
	}

	handleUserName(event) {
		this.setState({userName: event.target.value});
	}

	handlePassword(event) {
		this.setState({password: event.target.value});
	}

	submitLogIn(event) {
		let requestData = {
			method: 'post',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				userName: this.state.userName,
				password: this.state.password,
			}),
		}

		fetch('/api/login', requestData)
			.catch(err => console.log('Error', err))
			.then(response => response.json())
			.then(data => {
				console.log('Data', data)
				if(data.error) {
					this.setState({
						'error': data.error,
					})
				} else {
					this.props.updateToken(data.token)	
				}
			});
	}

	render() {
		return (
			<div>
				<h2>Please log-in to memsource API</h2>
				<div>
				{
					this.state.error !== false 
						? 'Wrong credentials, please try again'
						: ''
				}
				</div>
				<TextField
					hintText="UserName"
					onChange={this.handleUserName}
				/><br />
				<TextField
					hintText="Password"
					onChange={this.handlePassword}
				/><br />
				<RaisedButton label="Log in" primary={true} onClick={this.submitLogIn.bind(this)}/>
			</div>
		)
	}
}

class LoginPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			token: false,
		}
	}

	updateToken(newToken) {
		this.setState({token: newToken})
	}

	render() {
		if(this.state.token === false) {
			return <LoginForm updateToken={this.updateToken.bind(this)}/>
		}

		const childrenWithProps = React.Children.map(this.props.children,
     (child) => React.cloneElement(child, {
       token: this.state.token
     })
    );

		return (
			<div>
				<RaisedButton label="Log Out" primary={true} onClick={() => this.updateToken(false)}/>
				{childrenWithProps}

			</div>
		);
	}
}

export default LoginPage;