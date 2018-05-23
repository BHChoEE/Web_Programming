import React from 'react';
import axios from 'axios';

class FriendList extends React.Component{
    constructor(props){
        super(props);
        
    }
    chooseFriend = (e, i) => {
        var name = this.props.friendList[i];
        this.props.pickFriendCallback(e, name);
    }

    render(){
        var friends = this.props.friendList.map((item, i)=>(
            <li key={i} onClick={ (e) => this.chooseFriend(e, i)}>{item}</li>
        ));
        return(
            <ul>
                {friends}
            </ul>
        );
    }
}
export default FriendList;