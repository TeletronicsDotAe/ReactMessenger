import React from 'react-native';
import ThreadList from '../ThreadList';
import Chat from '../Chat';
import {Router, Route, Schema, Animations, TabBar} from 'react-native-router-flux'

var {
  View,
  Text,
  Navigator
} = React;



export default class Main extends React.Component{
  render(){
    return (
      <Router hideNavBar={true}>
        <Schema name="default" sceneConfig={Navigator.SceneConfigs.FloatFromRight}/>
        <Route name="chat">
          <Router name="chatRouter">
            <Route name="threadList" initial={true} component={ThreadList} title="Chats"/>
            <Route name="chatView" component={Chat}/>
          </Router>
        </Route>
      </Router>
    )
  }
}
