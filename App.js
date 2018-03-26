import React from 'react';
import {StackNavigator} from 'react-navigation'
import Home from './Home'
import GameFinder from './GameFinder'

const RootStack = StackNavigator(
  {
    Home: {
      screen: Home
    },
    GameFinder: {
      screen: GameFinder
    },
  },
  {
    initialRouteName: 'Home',
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#ffa500'
      },
      headerTintColor: '#fff'
    }
  }
)

export default class App extends React.Component {
  render() {
    return <RootStack />
  }
}