import React,{Navigator} from 'react-native';
import {Actions, Scene, Scheme} from 'react-native-router-flux';
import ThreadList from './Components/ThreadList';
import Chat from './Components/Chat';

export default Actions.create(
  <Scene key="chat">
    <Scene key="threadList" initial={true} component={ThreadList} title="Chats"/>
    <Scene key="chatView" title="Chat" component={Chat}/>
  </Scene>
)
