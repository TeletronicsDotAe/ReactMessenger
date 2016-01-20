'use strict;'
var AppDispatcher = require('../Dispatcher');
var AppConstants = require('../Constants').default;
var ChatMessageUtils = require('../Utils/MessageUtils');
var EventEmitter = require('EventEmitter');
var ThreadStore = require('../Stores/ThreadStore');

var ActionTypes = AppConstants.ActionTypes;
var CHANGE_EVENT = 'change';

var _messages = [];

function _addMessages(rawMessages) {
  rawMessages.forEach(function(message) {
    if (!_messages[message.id]) {
      _messages[message.id] = ChatMessageUtils.convertRawMessage(
        message
      );
    }
  });
}

function _markAllInThreadRead(threadID) {
  for (var id in _messages) {
    if (_messages[id].threadID === threadID) {
      _messages[id].isRead = true;
    }
  }
}

var eventEmitter = new EventEmitter();

export default class MessageStore {

  static emitChange(){
    eventEmitter.emit(CHANGE_EVENT);
  }

  static addChangeListener(callback) {
    eventEmitter.addListener(CHANGE_EVENT, callback);
  }

  static removeChangeListener(callback) {
    eventEmitter.removeAllListeners(CHANGE_EVENT);
  }

  static get(id) {
    return _messages[id];
  }

  static getAll() {
    return _messages;
  }

  static getAllForThread(threadID) {
    var threadMessages = [];
    for (var id in _messages) {
      if (_messages[id].threadID === threadID) {
        threadMessages.push(_messages[id]);
      }
    }
    threadMessages.sort(function(a, b) {
      if (a.date < b.date) {
        return -1;
      } else if (a.date > b.date) {
        return 1;
      }
      return 0;
    });
    return threadMessages;
  }
}

MessageStore.dispatchToken = AppDispatcher.register(function(action) {
  switch(action.type) {
    case ActionTypes.CLICK_THREAD:
      AppDispatcher.waitFor([ThreadStore.dispatchToken]);
      _markAllInThreadRead(ThreadStore.getCurrentID());
      MessageStore.emitChange();
      break;
    case ActionTypes.CREATE_MESSAGE:
      var message = ChatMessageUtils.getCreatedMessageData(
        action.text,
        action.currentThreadID
      );
      _messages[message.id] = message;
      MessageStore.emitChange();
      break;

    case ActionTypes.RECEIVE_RAW_MESSAGES:
      _addMessages(action.rawMessages);
      AppDispatcher.waitFor([ThreadStore.dispatchToken]);
      _markAllInThreadRead(ThreadStore.getCurrentID());
      MessageStore.emitChange();
      break;

    default:
      // do nothing
  }

});

module.exports = MessageStore;
