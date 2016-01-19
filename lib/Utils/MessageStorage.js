import React from 'react-native';
import MessageActionCreators from '../Actions/MessageActionCreators';
import storage from 'react-native-simple-store';

var {
  AsyncStorage
} = React;

export default class MessageStore{

  static clear(){
    return AsyncStorage.clear();
  }

  static addMessage(message){
    return storage.get('messages').then(function (messages) {
      messages = messages || new Array();
      messages.push(message);
      return storage.save('messages', messages);
    }).then(function (updatedMessages) {
      MessageActionCreators.backend.receiveCreatedMessage(message);
    });
  }

  static deleteThread(threadID){
    return storage.get('messages').then(function (messages) {
      messages.filter((message) => {
        return message.threadID === threadID;
      });
      return storage.save('messages', messages);
    }).then(() => {
      return new Promise((resolve, reject) => {
        setTimeout(resolve, 1000);
      });
    });
  }

  static getAllMessages(){
    return storage.get('messages');
  }

}
