import React, { Component } from 'react';
import axios from 'axios';

import UserInput from './UserInput';
import ChatRoom from './chatroom';
import FriendList from './friendlist';
import {Grid} from '@material-ui/core';
class ChatLobby extends Component{
	constructor(props){
		super(props);
		this.state = {
			username: "",
			friendname: "",
			friendList: [],
			messageList: []
		};
		
	}
	componentDidMount() {
		var dat = sessionStorage.getItem('userInfo');
		if(dat === null){
			window.alert('no name in sessionStorage');
			window.location = '/login';
		} else {
			var tmp = JSON.parse(dat);
			this.setState({username: tmp.username});
			axios.get('/user/allusers', {
				params: {
					username: tmp.username,
				}
			})
			.then((res) =>{
				console.log(res.data);
				var fList = [];
				for(let i = 0 ; i < res.data.length ; ++i){
					fList.push(res.data[i].username);
				}
				this.setState({friendList: fList});
			})
			.catch((err) => {

			})
		}
		
	}
	pickFriendCallback = (e, name) => {
		console.log(name);
		this.setState({
			friendname: name
		});
		this.setState({
			messageList: []
		})
	}
	render(){
		if(this.state.username === "") {
			return null
		}
		return(
			<Grid container spacing = {24}>
				<Grid item xs = {8} sm = {3}>
					<FriendList username={this.state.username} friendList={this.state.friendList} 
						pickFriendCallback={this.pickFriendCallback}/>
				</Grid>
				<Grid item xs = {12} sm = {9}>
					<ChatRoom username={this.state.username} messageList={this.state.messageList} friendname={this.state.friendname}></ChatRoom>
				</Grid>
				
			</Grid>
		);
	}
}
export default ChatLobby;