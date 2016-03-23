import React,{Component, Text, View, StyleSheet} from 'react-native';
import MK,{MKColor, MKSwitch, MKButton} from 'react-native-material-kit';
import ColorPalette from '../../color-palette';

const styles = StyleSheet.create({
  SettingsScene: {
    flex: 1,
    paddingTop: 64
  },
  PinCodeSection: {

  },
  Section: {
  },
  SectionLabel: {
    color: MKColor.Grey,
    fontWeight: 'bold',
    padding: 16
  },
  SettingsOption: {
    padding: 16,
    flexDirection: 'row'
  },
  SettingsOptionDescription: {
    flex: .8,
    flexDirection: 'column'
  },
  SettingsOptionLabel: {
    fontWeight: '600',
    fontSize: 17
  },
  SettingsOptionSecondaryLabel: {
    fontWeight: '400',
    paddingTop:4
  },
  SettingsOptionValue: {
    flex: .2
  },
  SettingsOptionSwitch: {

  }
})

export default class SettingsScene extends Component {
  render() {
    return (
      <View style={styles.SettingsScene}>
        <View style={styles.Section}>

          <Text style={styles.SectionLabel}>Security</Text>

          <MKButton onPress={() => {
            var pincodeSwitch = this.refs.PinCodeEnabled;
            pincodeSwitch.confirmToggle();
          }} style={styles.SettingsOption}>
            <View style={styles.SettingsOptionDescription}>
              <Text style={styles.SettingsOptionLabel}>Pin code</Text>
              <Text style={styles.SettingsOptionSecondaryLabel}>Enable pin code when the app opens</Text>
            </View>
            <View style={styles.SettingsOptionValue}>
              <MKSwitch
                ref="PinCodeEnabled"
                checked={true}
                style={styles.SettingsOptionSwitch}
                thumbOnColor={ColorPalette.Accent}/>
            </View>
          </MKButton>
          <MKButton rippleColor="rgba(242,242,242,.5)" style={styles.SettingsOption}>
            <View style={styles.SettingsOptionDescription}>
              <Text style={styles.SettingsOptionLabel}>Change pin code</Text>
              <Text style={styles.SettingsOptionSecondaryLabel}>Change the pin code promting when the app opens</Text>
            </View>
          </MKButton>


        </View>
      </View>
    )
  }
}
