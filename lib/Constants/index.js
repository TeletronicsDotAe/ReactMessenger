var keyMirror = require('keymirror');

export default {

  ActionTypes: keyMirror({
    CLICK_THREAD: null,
    CREATE_MESSAGE: null,
    DELETE_THREAD: null,
    RECEIVE_RAW_CREATED_MESSAGE: null,
    RECEIVE_RAW_MESSAGES: null,
    THREAD_DELETED: null
  })

};
