import React from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import axios from 'axios'


export default class Home extends React.Component {
	static navigationOptions = {
		title: 'Nike PUG'
	}
	constructor(props) {
		super(props)

		this.state = {
			usernameInput: '',
			passwordInput: '',
            errorMessage: ''
		}
		this.nameInput = this.nameInput.bind(this)
		this.passInput = this.passInput.bind(this)
		this.loginUser = this.loginUser.bind(this)
		this.registerUser = this.registerUser.bind(this)
	}

	nameInput(e) {
		this.setState({ usernameInput: e.nativeEvent.text })
	}

	passInput(e) {
		this.setState({ passwordInput: e.nativeEvent.text })
	}

	loginUser() {
		const { usernameInput, passwordInput } = this.state
		if (usernameInput && passwordInput) {
			axios.post('http://192.168.3.123:3700/api/loginuser', { username: usernameInput.toLocaleLowerCase(), password: passwordInput }).then(res => {
				if (res.data.length !== 0) {
					this.setState({ errorMessage: res.data })
				} else {
					this.props.navigation.navigate('GameFinder', {username: usernameInput})
				}
			})
		} else {
			this.setState({ errorMessage: 'Please fill in both fields' })
		}
	}

	registerUser() {
		const { usernameInput, passwordInput } = this.state
		if (usernameInput && passwordInput) {
			axios.post('http://192.168.3.123:3700/api/registeruser', { username: usernameInput.toLocaleLowerCase(), password: passwordInput }).then(res => {
				if (res.data.length !== 0) {
					this.setState({ errorMessage: res.data })
				} else {
					this.props.navigation.navigate('GameFinder', {username: usernameInput})
				}
			})
		} else {
			this.setState({ errorMessage: 'Please fill in both fields' })
		}
	}

	render() {
		const { usernameInput, passwordInput, errorMessage } = this.state
		const { nameInput, passInput, registerUser, loginUser } = this
		return (
			<View style={styles.container}>
				<Text>Logo Placeholder</Text>
				<Text style={styles.inputTitle}>Username</Text>
				<TextInput
					style={styles.inputBox}
					value={usernameInput}
					onChange={(e) => nameInput(e)}
					placeholder='Username'
				/>
				<Text style={styles.inputTitle}>Password</Text>
				<TextInput
					style={styles.inputBox}
					value={passwordInput}
					onChange={(e) => passInput(e)}
					placeholder='Password'
					secureTextEntry={true}
				/>
				{
					errorMessage
						?
						<Text style={{ color: 'orange' }}>{errorMessage}</Text>
						:
						null
				}
				<Button
					style={styles.loginButton}
					title='Login'
					onPress={() => loginUser()}
				/>
				<Button
					style={styles.loginButton}
					title='Register'
					onPress={() => registerUser()}
				/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		// justifyContent: 'center',
	},
	inputTitle: {
		width: '60%'
	},
	inputBox: {
		height: 40,
		borderColor: 'gray',
		padding: 8,
		width: '60%'
	},
	loginButton: {
		color: 'yellow',
		margin: 10
	}
});