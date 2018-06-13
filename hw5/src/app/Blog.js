import React from 'react';
import ButtonAppBar from './ButtonAppBar.js';
import {Grid} from '@material-ui/core';
import SimpleList from './SimpleList.js';
import SimpleToolTips from './SimpleToolTip.js';
import EditArticle from './EditArticle.js';
import ViewArticle from './ViewArticle';
import axios from 'axios';
import SimpleUserList from './UserList';

class Blog extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            username: "",
            hostname: "",
            postList: [],
            userList: [],
            mode: "",
            time: "",
            content: "",
            title: "",
            hash: "",
            open: false,
        }
        this.handleEditPress = this.handleEditPress.bind(this);
    }

    componentDidMount(){
        var retrievedObject = sessionStorage.getItem('userInfo');
        if(retrievedObject == null) {
            var username = 'guest';
        }else{
            retrievedObject = JSON.parse(retrievedObject);
            var username = retrievedObject.username;
        }

        var host = this.props.location.pathname.split('/')[2];
        if(host === undefined) {
            host = "";
        }

        axios.get('/user/allusers', {
             params: {
               username: username
             }
        })
        .then( (res) => {
         for(var i = 0; i < res['data'].length; i++) {
               var user = JSON.parse(res['data'][i]);
               this.setState({
                 userList: this.state.userList.concat(user),
               }, () => console.log(this.state.userList));
            }
        })
        .catch(function (error) {
            console.log(error);
        });
        
        axios.get('/blog/list', {
            params: {
                hostname: host
            }
        })
        .then((res) => {
            res.data.sort((a, b) => a.timestamp - b.timestamp);
            for(let i = 0 ;  i < res['data'].length ; ++i){
                var post = res['data'][i];
                this.setState({postList: this.state.postList.concat(post)});
            }
        })
        .catch(function(err){
            console.log(err);
        })
        this.setState(
            {username: username, hostname: host},
            () => {document.title = this.state.username;}
        );
        
    };
    funcArticle(){
        if(this.state.mode=='view'){
            return <ViewArticle 
                title={this.state.title} 
                time={this.state.time} 
                content={this.state.content}
                handleEditCb={this.handleEditCb} 
                isSelf={this.state.username === this.state.hostname}/>;
        }
        else if(this.state.mode == 'edit'){
            return <EditArticle 
                title={this.state.title} 
                time={this.state.time} 
                content={this.state.content}
                handleTitleCb={this.handleTitleCb} 
                handleContentCb={this.handleContentCb}
                savePostCb={this.savePostCb} />;
        }else{
            return null;
        }
    };
    handleTitleCb = (t) =>  { this.setState({title: t}); };
    handleContentCb = (c)  => { this.setState({content: c}); };
    handlePreviewCb = (hash) => {
        var tmpList = [];
        for(let i = 0 ; i < this.state.postList.length; ++i){
            var post = this.state.postList[i];
            if(post['hash'] === hash){
                this.setState({
                    title: post['title'],
                    time: post['time'],
                    content: post['content'],
                    hash: post['hash']
                });
            }
            tmpList.push(post); 
        }
        this.setState({
            postList: tmpList,
            mode: "view",
        });
    };
    handleEditCb = (e) => {
        e.preventDefault();
        this.setState({mode: "edit"});
    }
    // for saving whole editing post to db
    savePostCb = () => {
        // make hash for each post(article)
        var newPost = false;
        if(this.state.hash === ""){
            var hash = Math.random().toString(36).substr(2, 5);
            newPost = true;
        }else{
            var hash = this.state.hash;
        }
        var myres = null;
        this.setState({hash: hash}, () => {
            axios.put('/blog/post', {
                title: this.state.title,
                content: this.state.content, 
                hash: this.state.hash,
                author: this.state.username,
            })
            .then((res) => {
                // console.log(res.data);
                myres = res.data;
                if(newPost == true){
                    this.setState({
                        postList: this.state.postList.concat(myres),
                        title: "",
                        time: "",
                        content: "",
                        hash: "",
                        mode: ""
                    })
                } else {
                    var tmpList = [];
                    for(let i = 0 ; i < this.state.postList.length ; ++i){
                        var post = this.state.postList[i];
                        if(post['hash'] === hash){    // same post
                            post = myres;

                        }
                        tmpList.push(post);
                    }
                    tmpList.sort((a, b) => a.timestamp - b.timestamp);
                    this.setState({
                        postList: tmpList,
                        title: "",
                        content: "",
                        time: "",
                        hash: "",
                        mode: "",
                    })
                }
            })
            .catch(function(err){
                console.log(err);
            })
        })
    };
    handleEditPress(){
        this.setState({mode: "edit"}); 
        console.log("pressed"); 
    };
    addButton(){
        if(this.state.hostname !== this.state.username) 
            return null;
        return(
            <SimpleToolTips edit={this.handleEditPress }/>
        )
    }
    handleClick = (e) => {
        this.setState({
            open: true
        })
    }
    handleClose = value => {
        this.setState({
            hostname: value,
            open: false,
        }, () => {
            this.props.history.push('/blog/'+this.state.hostname);
            location.reload();
        });
    };
    render(){
        return(
            <div>
            <ButtonAppBar 
                username={this.state.username} 
                hostname = {this.state.hostname} 
                history = {this.props.history}
                handleClick = {e => this.handleClick(e)}/>
            <SimpleUserList 
                userList = {this.state.userList}
                open = {this.state.open}
                onClose = {this.handleClose}/>
            <Grid container spacing={24}>
                <Grid item xs={12} sm={9}>
                {this.funcArticle()}
                </Grid>
                <Grid item xs={8} sm={2}>
                <SimpleList mode={this.state.mode} handlePreviewCb={this.handlePreviewCb}   postList={this.state.postList}/>
                </Grid>
            </Grid>

            {this.addButton()}
            </div>
        );
    };
}
export default Blog;