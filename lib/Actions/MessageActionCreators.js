var AppDispatcher = require('../Dispatcher');
var AppConstants = require('../Constants').default;
var MessageUtils = require('../Utils/MessageUtils');
var API = require('../Utils/API');

var ActionTypes = AppConstants.ActionTypes;

export default {
  receiveAll: function(rawMessages) {
    AppDispatcher.dispatch({
      type: ActionTypes.RECEIVE_RAW_MESSAGES,
      rawMessages: rawMessages
    });
  },
  frontend: {
    createMessage: function(text, currentThreadID) {
      AppDispatcher.dispatch({
        type: ActionTypes.CREATE_MESSAGE,
        text: text,
        currentThreadID: currentThreadID
      });
      var message = MessageUtils.getCreatedMessageData(text, currentThreadID);
      API.createMessage(message);
    },
    clickThread: function(threadID) {
      AppDispatcher.dispatch({
        type: ActionTypes.CLICK_THREAD,
        threadID: threadID
      });
    },
    deleteThread: function (threadID) {
      AppDispatcher.dispatch({
        type: ActionTypes.DELETE_THREAD,
        threadID: threadID
      });
      API.deleteThread(threadID)
      .then(() => {
        AppDispatcher.dispatch({
          type: ActionTypes.THREAD_DELETED,
          threadID: threadID
        });
      })
      .catch((err) => {

      });
    }
  },
  backend: {
    receiveCreatedMessage: function(createdMessage) {
      AppDispatcher.dispatch({
        type: ActionTypes.RECEIVE_RAW_CREATED_MESSAGE,
        rawMessage: createdMessage
      });
    }
  }

}
