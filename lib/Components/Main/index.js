import React from 'react-native';
import ThreadList from '../ThreadList';
import Chat from '../Chat';
import {Router, Route, Schema, Animations, TabBar} from 'react-native-router-flux'
import scenes from '../../scenes';

var {
  View,
  Text,
  Navigator
} = React;



export default class Main extends React.Component{
  render(){
    return (
      <Router scenes={scenes}></Router>
    )
  }
}
