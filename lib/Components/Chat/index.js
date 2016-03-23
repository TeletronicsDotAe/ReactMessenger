import React, {View, Text, StyleSheet, ListView, Dimensions} from 'react-native';
import {Actions} from 'react-native-router-flux';
import MessageStore from '../../Stores/MessageStore';
import ThreadStore from '../../Stores/ThreadStore';
import GiftedMessenger from 'react-native-gifted-messenger';
import MessageActionCreators from '../../Actions/MessageActionCreators';

var styles = StyleSheet.create({
  container: {
    marginTop: 70
  }
});

export default class Chat extends React.Component{

  constructor(props) {
    super(props);
    this.state = this.getStateFromStores();
    MessageStore.addChangeListener(this._onChange.bind(this));
  }
  _onChange(){
    this.setState(this.getStateFromStores());
  }

  componentWillUnmount(){
    MessageStore.removeChangeListener(this._onChange.bind(this));
  }

  getMessages(){
    return MessageStore.getAllForThread(this.props.threadId).map((message) => {
      return {
        text: message.text,
        name: message.authorName,
        image: {
          uri: 'https://facebook.github.io/react/img/logo_og.png'
        },
        position: message.authorName == 'Bill' ? 'right' : 'left',
        date: message.date
      }
      return message;
    });
  }

  handleSend(message){
    MessageActionCreators.frontend.createMessage(message.text, this.props.threadId);
  }

  getStateFromStores(){
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return {
      messagesDataSource: ds.cloneWithRows(MessageStore.getAllForThread(this.props.threadId)),
    };
  }

  renderChatBubble(message){
    return <ChatBubble message={message} />
  }

  render(){
    const messages = this.getMessages();
    return (
      <GiftedMessenger
        ref={(c) => this._GiftedMessenger = c}
        messages={messages}
        handleSend={this.handleSend.bind(this)}
        maxHeight={Dimensions.get('window').height - 64} // 64 for the navBar
        style={styles.container}

        styles={{
          bubbleLeft: {
            backgroundColor: '#e6e6eb',
            marginRight: 70,
          },
          bubbleRight: {
            backgroundColor: '#007aff',
            marginLeft: 70,
          },
        }}
      />
    );
  }
}
