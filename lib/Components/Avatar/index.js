import React, {View, Text, StyleSheet} from 'react-native';

var styles = StyleSheet.create({
  avatarContainer: {
    flex: .2,
  },
  avatarWrapper: {
    backgroundColor: '#009688',
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  avatar: {
    color: 'white',
    borderColor: 'transparent',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16
  },
});

var colors = [
  "#F44336",
  "#E91E63",
  "#9C27B0",
  "#673AB7",
  "#3F51B5",
  "#2196F3",
  "#03A9F4",
  "#00BCD4",
  "#009688",
  "#4CAF50",
  "#8BC34A",
  "#CDDC39",
  "#FFC107",
  "#FF9800",
  "#FF5722",
]

export default class Avatar extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      avatarBackgroundColor: "#607D8B"
    }
  }

  componentDidMount(){
    this.setState({
      avatarBackgroundColor: this._calculateColor(this.props.name)
    })
  }

  _calculateColor(name){
    var hashValue = this._hashString(name)
    return colors[hashValue % colors.length];
  }

  _hashString(str){
    var hash = 5381;
    var i = str.length;
    while(i){
      hash = (hash * 33) ^ str.charCodeAt(--i)
    }
   return hash >>> 0;
  }

  render(){
    var {
      name
    } = this.props;

    return(
      <View style={styles.avatarContainer}>
        <View style={[styles.avatarWrapper, {
          backgroundColor: this.state.avatarBackgroundColor
        }]}>
          <Text style={styles.avatar}>
            {name.substring(0, 1).toUpperCase()}
          </Text>
        </View>
      </View>
    )
  }
}

Avatar.propTypes = {
  name: React.PropTypes.string
}
