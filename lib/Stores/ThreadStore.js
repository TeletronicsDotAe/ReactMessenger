var AppDispatcher = require('../Dispatcher');
var AppConstants = require('../Constants').default;
var MessageUtils = require('../Utils/MessageUtils');
var EventEmitter = require('EventEmitter');

var ActionTypes = AppConstants.ActionTypes;
var CHANGE_EVENT = 'change';
var eventEmitter = new EventEmitter();

var _currentID = null;
var _threads = {};
var _initiated = false;

export default class ThreadStore {

  static init(rawMessages) {
    rawMessages.forEach(function(message) {
      var threadID = message.threadID;
      var thread = _threads[threadID];
      if (thread && thread.lastMessage.timestamp > message.timestamp) {
        return;
      }
      _threads[threadID] = {
        id: threadID,
        name: message.threadName,
        lastMessage: MessageUtils.convertRawMessage(message, _currentID)
      };
    }, this);

    if (!_currentID) {
      var allChrono = this.getAllChrono();
      _currentID = allChrono[allChrono.length - 1].id;
    }

    _threads[_currentID].lastMessage.isRead = true;
    _initiated = true;
  }

  static isInitiated(){
    return _initiated;
  }

  static deleteThread(threadID){
    delete _threads[threadID];
  }

  static markForDeletion(threadID){
    var thread = Object.assign({}, this.get(threadID));
    thread.markedForDeletion = true;
    _threads[threadID] = thread;
  }

  static emitChange(){
    eventEmitter.emit(CHANGE_EVENT);
  }

  static addChangeListener(callback){
    eventEmitter.addListener(CHANGE_EVENT, callback);
  }

  static removeChangeListener(callback){
    eventEmitter.removeListener(CHANGE_EVENT, callback);
  }

  static get(id){
    return _threads[id];
  }

  static getAll(){
    return Object.assign({}, _threads);
  }

  static getAllChrono(){
    var orderedThreads = [];
    for (var id in _threads) {
      var thread = _threads[id];
      orderedThreads.push(thread);
    }
    orderedThreads.sort(function(a, b) {
      if (a.lastMessage.date < b.lastMessage.date) {
        return -1;
      } else if (a.lastMessage.date > b.lastMessage.date) {
        return 1;
      }
      return 0;
    });
    return orderedThreads;
  }

}

ThreadStore.dispatchToken = AppDispatcher.register(function(action) {
  switch(action.type) {

    case ActionTypes.CLICK_THREAD:
      _currentID = action.threadID;
      _threads[_currentID].lastMessage.isRead = true;
      ThreadStore.emitChange();
      break;

    case ActionTypes.RECEIVE_RAW_MESSAGES:
      ThreadStore.init(action.rawMessages);
      ThreadStore.emitChange();
      break;

    case ActionTypes.DELETE_THREAD:
      ThreadStore.markForDeletion(action.threadID);
      ThreadStore.emitChange();
      break;

    case ActionTypes.THREAD_DELETED:
      ThreadStore.deleteThread(action.threadID);
      ThreadStore.emitChange();
      break;

    default:
      break;
  }

});
