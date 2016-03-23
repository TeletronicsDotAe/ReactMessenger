import React, {View, Text, StyleSheet} from 'react-native';
import MK, {MKButton, MKColor, mdl} from 'react-native-material-kit';
import Avatar from '../Avatar';
import Swipeout from 'react-native-swipeout';
import MessageActionCreators from '../../Actions/MessageActionCreators';
import Animatable from 'react-native-animatable';

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    padding: 16,
    borderColor: '#ECEFF1',
    borderBottomWidth: 1,
    backgroundColor: '#FFFFFF'
  },
  messagePreview: {
    flex: 0.8
  },
  threadName: {
    fontWeight: 'bold'
  },
  timeContainer: {
    padding: 2,
  },
  time: {
    color: '#9E9E9E'
  }
});

const IndeterminateProgress = mdl.Progress.indeterminateProgress()
  .withProgressColor(MKColor.Red)
  .withStyle(styles.progress)
  .build();

export default class ThreadListItem extends React.Component {

  constructor(props) {
    super(props);
  }

  onDelete(){
    MessageActionCreators.frontend.deleteThread(this.props.thread.id);
    this.refs.swipeOut._close();
  }

  _renderLoading(){
    return <IndeterminateProgress />
  }

  render(){
    var {
      thread
    } = this.props;

    return (
      <Animatable.View animation="bounceInRight" duration={300}>
        <MKButton style={styles.container}
        rippleColor="rgba(63,81,181,.15)"
        onPress={thread.markedForDeletion !== true ? this.props.onChoose.bind(this, {threadId: thread.id, title: thread.name}) : null }>
          <Avatar name={thread.name}/>
          <View style={styles.messagePreview}>
            <Text style={styles.threadName}>{thread.name}</Text>
            <Text>{thread.lastMessage.text}</Text>
          </View>
          <View style={styles.timeContainer}>
            <Text style={styles.time}>08:12</Text>
          </View>
        </MKButton>
      </Animatable.View>
    );
  }
}
