import MessageStorage from './Utils/MessageStorage';

export default class ExampleData{
  static init() {
    MessageStorage.clear();
    return MessageStorage.addMessage({
      id: 'm_1',
      threadID: 't_1',
      threadName: 'Jing and Bill',
      authorName: 'Bill',
      text: 'Hey Jing, want to give a Flux talk at ForwardJS?',
      timestamp: Date.now() - 99999
    })
    .then(function () {
      return MessageStorage.addMessage({
        id: 'm_2',
        threadID: 't_1',
        threadName: 'Jing and Bill',
        authorName: 'Bill',
        text: 'Seems like a pretty cool conference.',
        timestamp: Date.now() - 89999
      });
    })
    .then(function () {
      return MessageStorage.addMessage({
        id: 'm_3',
        threadID: 't_1',
        threadName: 'Jing and Bill',
        authorName: 'Jing',
        text: 'Sounds good.  Will they be serving dessert?',
        timestamp: Date.now() - 79999
      });

    })
    .then(function () {
      return MessageStorage.addMessage({
        id: 'm_4',
        threadID: 't_2',
        threadName: 'Dave and Bill',
        authorName: 'Bill',
        text: 'Hey Dave, want to get a beer after the conference?',
        timestamp: Date.now() - 69999
      });
    })
    .then(function () {
      return MessageStorage.addMessage({
        id: 'm_5',
        threadID: 't_2',
        threadName: 'Dave and Bill',
        authorName: 'Dave',
        text: 'Totally!  Meet you at the hotel bar.',
        timestamp: Date.now() - 59999
      });
    })
    .then(function () {
      return MessageStorage.addMessage({
        id: 'm_6',
        threadID: 't_3',
        threadName: 'Functional Heads',
        authorName: 'Bill',
        text: 'Hey Brian, are you going to be talking about functional stuff?',
        timestamp: Date.now() - 49999
      });

    })
    .then(function () {
      return MessageStorage.addMessage({
        id: 'm_7',
        id: 'm_7',
        threadID: 't_3',
        threadName: 'Bill and Brian',
        authorName: 'Brian',
        text: 'At ForwardJS?  Yeah, of course.  See you there!',
        timestamp: Date.now() - 99999
      });
    })
    .then(function () {
      return MessageStorage.addMessage({
        id: 'm_8',
        id: 'm_8',
        threadID: 't_3',
        threadName: 'Bill and Brian',
        authorName: 'Brian',
        text: 'Yes',
        timestamp: Date.now()
      });
    })
    .then(function () {
      return MessageStorage.addMessage({
        id: 'm_9',
        id: 'm_9',
        threadID: 't_4',
        threadName: 'Yoko and Bill',
        authorName: 'Bill',
        text: 'Hey. Testing on day 1',
        timestamp: new Date(2016, 0, 1, 23, 0)
      });
    })
    .then(function () {
      return MessageStorage.addMessage({
        id: 'm_10',
        id: 'm_10',
        threadID: 't_4',
        threadName: 'Yoko and Bill',
        authorName: 'Yoko',
        text: 'Hey. Response on day two!',
        timestamp: new Date(2016, 0, 2, 1, 0)
      });
    })
    .then(function () {
      return MessageStorage.addMessage({
        id: 'm_11',
        id: 'm_11',
        threadID: 't_4',
        threadName: 'Yoko and Bill',
        authorName: 'Yoko',
        text: 'Hey. New message a while ago!',
        timestamp: Date.now() - 600
      });
    })
    .then(function () {
      return MessageStorage.addMessage({
        id: 'm_12',
        id: 'm_12',
        threadID: 't_4',
        threadName: 'Yoko and Bill',
        authorName: 'Bill',
        text: 'Hey. Response just now!',
        timestamp: Date.now()
      });
    })
    .then(function () {
      return MessageStorage.addMessage({
        id: 'm_13',
        id: 'm_13',
        threadID: 't_4',
        threadName: 'Yoko and Bill',
        authorName: 'Yoko',
        text: 'Ok cool! Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor.',
        timestamp: Date.now()
      });
    });
  }
}
