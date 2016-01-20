/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

import React from 'react-native';
import App from './lib/App';

var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
} = React;


class ReactMessenger extends React.Component{
  render(){
    return (
      <App />
    );
  }
}
AppRegistry.registerComponent('ReactMessenger', () => ReactMessenger);
