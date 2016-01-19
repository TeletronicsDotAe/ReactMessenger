
import ActionCreators from '../Actions/MessageActionCreators';
import MessageStorage from './MessageStorage';

module.exports = {

  getAllMessages: function() {
    // simulate retrieving data from a database
    MessageStorage.getAllMessages().then(function (messages) {
      ActionCreators.receiveAll(messages);
    });
  },

  deleteThread: function (threadID) {
    return MessageStorage.deleteThread(threadID);
  },

  createMessage: function(message, threadName) {
    // simulate writing to a database
    var timestamp = Date.now();
    var id = 'm_' + timestamp;
    var threadID = message.threadID || ('t_' + Date.now());
    var createdMessage = {
      threadID: threadID,
      threadName: threadName,
      authorName: message.authorName,
      text: message.text,
      timestamp: timestamp
    };
    MessageStorage.addMessage(id, createdMessage).then(() => {
      ChatServerActionCreators.receiveCreatedMessage(createdMessage);
    });
  }

};
