import React,{Navigator, StyleSheet} from 'react-native';
import {Actions, Scene, Scheme} from 'react-native-router-flux';
import ThreadList from './Components/ThreadList';
import Chat from './Components/Chat';
import Navigation from './Components/Navigation';
import SettingsScene from './Components/SettingsScene';
import ColorPalette from './color-palette';

const styles = StyleSheet.create({
  Navbar: {
    backgroundColor: ColorPalette.Primary
  },
  NavbarTitle: {
    color: '#FFFFFF'
  }
});

export default Actions.create(
  <Scene key="root" component={Navigation}>
    <Scene key="chat" navigationBarStyle={styles.Navbar} titleStyle={styles.NavbarTitle}>
      <Scene key="threadList" component={ThreadList} title="Chats"/>
      <Scene key="chatView" title="Chat" component={Chat}/>
    </Scene>
    <Scene key="settings" component={SettingsScene} />
  </Scene>
)
