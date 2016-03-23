import React,{Component, StyleSheet, Text, View} from 'react-native';
import Drawer from 'react-native-drawer';
import {DefaultRenderer} from 'react-native-router-flux';
import MK, {MKButton, MKColor, mdl} from 'react-native-material-kit';
import {Actions} from 'react-native-router-flux';

const styles = StyleSheet.create({
  Profile: {
    padding: 16,
    paddingTop: 26,
    backgroundColor: MKColor.DeepOrange
  },
  ProfileText: {
    color: '#FFFFFF'
  },
  Username:{
    fontWeight: 'bold'
  },
  MenuList: {
    flex: 1,
    backgroundColor: 'red'
  },
  MenuItem: {
    flex: 1,
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#FFFFFF'
  }
})

const Profile = (props) => {
  return (
    <View style={styles.Profile}>
      <Text style={[styles.ProfileText, styles.Username]}>{props.username}</Text>
      <Text style={styles.ProfileText}>{props.phonenumber}</Text>
    </View>
  )
}

const MenuList = (props) => {
  return (
    <View style={styles.MenuList}>
      {props.children}
    </View>
  )
}

const MenuItem = (props) => {
  return (
    <MKButton
    style={styles.MenuItem}
    rippleColor="rgba(242,242,242,.5)"
    onPress={props.onPress}
    >
      <Text>{props.label}</Text>
    </MKButton>
  )
}

const SideBar = (props) => {
  return (
    <View>
      <Profile username="kristian" phonenumber="+971 052 323 7717"/>
      <MenuList>
        <MenuItem label="Chats" onPress={() => {
          Actions.chat();
          props.onChoose();
        }}/>
        <MenuItem label="Settings" onPress={() => {
          Actions.settings();
          props.onChoose();
        }} />
      </MenuList>
    </View>
  )
}

export default class Navigation extends Component {
  componentDidMount(){
    this.refs.root.open();
  }
  render(){
    const navigationState = this.props.navigationState;
    let selected = navigationState.children[navigationState.index];
    return (
        <Drawer
            ref="root"
            type="displace"
            content={<SideBar onChoose={() => {
              console.log("Chose");
              this.refs.root.close();
            }} />}
            tapToClose={true}
            openDrawerOffset={0.2}
            panCloseMask={0.2}
            negotiatePan={true}
            tweenHandler={(ratio) => ({
                 main: { opacity:Math.max(0.54,1-ratio) }
            })}>
            <DefaultRenderer navigationState={selected}></DefaultRenderer>
        </Drawer>
    );
  }
}
