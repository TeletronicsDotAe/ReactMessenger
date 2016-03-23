import React,{Component, StyleSheet, Text, View} from 'react-native';
import Drawer from 'react-native-drawer';
import {DefaultRenderer} from 'react-native-router-flux';
import MK, {MKButton, MKColor, mdl} from 'react-native-material-kit';
import {Actions} from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/MaterialIcons';

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
  },
  MenuItemLabel:{
    flex: .8
  },
  MenuItemIcon:{
    flex: .2
  },
  MenuItemActive: {
    color: MKColor.DeepOrange
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
  const activeStyling = (props.selected.name == props.name ? styles.MenuItemActive : {});
  return (
    <MKButton
    style={styles.MenuItem}
    rippleColor="rgba(242,242,242,.5)"
    onPress={props.onPress}
    >
      <Icon style={[styles.MenuItemIcon, activeStyling]} size={22} color="#737373" name={props.icon} />
      <Text style={[styles.MenuItemLabel, activeStyling]}>{props.label}</Text>
    </MKButton>
  )
}

const SideBar = (props) => {
  return (
    <View>
      <Profile username="kristian" phonenumber="+971 052 323 7717"/>
      <MenuList>
        <MenuItem label="Chats" selected={props.selected} name="chat" icon="message" onPress={() => {
          Actions.chat();
          props.onChoose();
        }}/>
        <MenuItem label="Settings" selected={props.selected} name="settings" icon="settings" onPress={() => {
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
            content={<SideBar selected={selected} onChoose={() => {
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
