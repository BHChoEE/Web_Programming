import React from 'react';
import {render} from 'react-dom';
import ChatLobby from './chatlobby'

class App extends React.Component {
    constructor(props){
        super(props);
    }
    render() {
        return(<ChatLobby></ChatLobby>);
    }
}
render (<App/>, document.getElementById('app'));