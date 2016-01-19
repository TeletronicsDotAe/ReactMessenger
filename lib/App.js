import React from 'react-native';
import Main from './Components/Main';
import ExampleData from './ExampleData';
import API from './Utils/API';

ExampleData.init().then(function () {
  API.getAllMessages();
});

export default class App extends React.Component{
  render(){
    return <Main />
  }
}
