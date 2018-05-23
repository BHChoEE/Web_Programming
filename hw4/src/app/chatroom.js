import React, { Component } from 'react';
import UserInput from './UserInput';
import io from 'socket.io-client';
class ChatRoom extends Component{
	constructor(props){
        super(props);
        this.socket = io();
        this.socket.emit('username', this.props.username)
		
	}
    componentDidMount(){
        this.socket.on('message', (msg) => {
            msg = JSON.parse(msg);
            var list = this.props.messageList;
            list.push(msg.from+': '+msg.msg);
            this.setState({messageList: list});
        })
    }
    sendMsgCallBack = (msg) => {
        var list = this.props.messageList;
        list.push('Self: '+msg);
        this.setState({messageList: list});
        var myMsg = JSON.stringify({msg: msg, from: this.props.username, to: this.props.friendname})
        this.socket.emit('message', myMsg, (ack) => {console.log(ack);});
    }

	render(){
        var msgItems = this.props.messageList.map((item, i)=>(
            <li key={i}>{item}</li>
        ));
		return(
            <div>
                <ul>
                    {msgItems}
                </ul>
                <UserInput sendMsgCallBack={this.sendMsgCallBack}/>
            </div>
		);
	}
}
export default ChatRoom;