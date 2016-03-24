import React, { PropTypes, ListView, View, Text, StyleSheet, Image } from 'react-native'
import MessageStore from '../../Stores/MessageStore';
import ThreadStore from '../../Stores/ThreadStore';
import {Actions} from 'react-native-router-flux';
import ThreadListItem from '../ThreadListItem';
import Chat from '../Chat';
import ColorPalette from '../../color-palette';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/MaterialIcons';

var styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 64
  },
  emptyListContainer:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  emptyHeadline:{
    fontSize: 16,
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  }
});

export default class ThreadList extends React.Component {

  getStateFromStores(){
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return {
      threadDataSource: ds.cloneWithRows(ThreadStore.getAll()),
    };
  }

  constructor(props){
    super(props);
    this.state = this.getStateFromStores();
    ThreadStore.addChangeListener(this._onChange.bind(this));
  }

  _onChange(){
    this.setState({
      threadDataSource: this.state.threadDataSource.cloneWithRows(ThreadStore.getAll())
    });
  }

  renderChatListEntry(thread){
    return <ThreadListItem
      thread={thread}
      onChoose={Actions.chatView}
    />
  }

  _renderList(){
    return (
      <ListView
        dataSource={this.state.threadDataSource}
        renderRow={(thread) => this.renderChatListEntry(thread)}
      />
    );
  }

  _renderEmpty(){
    return (
      <View style={styles.emptyListContainer}>
        <Text style={styles.emptyHeadline}>You have no conversations</Text>
      </View>
    )
  }

  render () {
    return (
      <View style={styles.container}>
        {ThreadStore.isInitiated() && this.state.threadDataSource.getRowCount() < 1 ? this._renderEmpty() : this._renderList()}
        <ActionButton buttonColor={ColorPalette.Accent}>
          <ActionButton.Item buttonColor='#1abc9c' title="Broadcast message" onPress={() => {}}>
            <Icon name="announcement" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item buttonColor='#3498db' title="Group chat" onPress={() => {}}>
            <Icon name="people" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item buttonColor='#9b59b6' title="Single chat" onPress={() => console.log("notes tapped!")}>
            <Icon name="person" style={styles.actionButtonIcon} />
          </ActionButton.Item>
        </ActionButton>
      </View>
    )
  }
}

export default ThreadList;
