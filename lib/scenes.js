import React,{Navigator} from 'react-native';
import {Actions, Scene, Scheme} from 'react-native-router-flux';
import ThreadList from './Components/ThreadList';
import Chat from './Components/Chat';
import Navigation from './Components/Navigation';
import SettingsScene from './Components/SettingsScene';

export default Actions.create(
  <Scene key="root" component={Navigation}>
    <Scene key="chat">
      <Scene key="threadList" component={ThreadList} title="Chats"/>
      <Scene key="chatView" title="Chat" component={Chat}/>
    </Scene>
    <Scene key="settings" component={SettingsScene} />
  </Scene>
)
