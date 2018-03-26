import React from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';

export default class GameFinder extends React.Component {
	static navigationOptions = ({ navigation }) => {
		// const { params } = this.props.navigation.state

		return {
			title: 'Find Games',
			headerRight: <Image
							source={require('./resources/nikelogo.png')}
							style={{ width: 30, height: 30, marginRight: 10 }}
						 />
		}
		
  }

	render() {
		// console.log(this.props.navigation.state.params.username)
		// console.log(navigator.geolocation.getCurrentPosition(geo_success))
		// console.log(Geolocation.getCurrentPosition(geo_success))
		return (
			<View style={styles.container}>
				<Text>GameFinder</Text>

			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});