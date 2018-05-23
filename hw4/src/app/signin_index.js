import React from 'react';
import {render} from 'react-dom';
import SignIn from './signin';

class App extends React.Component {
  constructor(props){
    super(props);
  }
  render() {
  return (<SignIn></SignIn>);
  }
}

render (<App/>, document.getElementById('app'));