import React from 'react';
import {Dialog,Button,TextField,DialogActions,DialogContent,DialogContentText, DialogTitle} from '@material-ui/core';
import axios from 'axios';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      field_user: "",
      error: false
    };
    document.title = 'LogIn';
  }
  componentWillMount = () => {
    console.log("componentWillMount()");
    var retrievedObject = sessionStorage.getItem('userInfo');
    if(retrievedObject != null) {
      window.alert(retrievedObject + '\nredirect to Main...');
      var username = JSON.parse(retrievedObject)['username'];
      this.props.history.push('/blog/'+username);
    }
  };
  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
      error: false
    });
  };
  logInPage = e => {
    var re = RegExp('^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$');
    if(this.state.field_user.match(re) === null) {
      window.alert('Username must contain only English or number!!');
      this.setState({
        error: true,
        field_user: ""
      });
      return;
    }  
    axios.post('/user/login', {
      username: this.state.field_user,
      updateTime: Date.now()
    })
    .then( (res)=> {
      console.log(res.data.username);
      if(res.data != 'not found') { // no error
        sessionStorage.clear(); // clear old data
        var userInfo = { 'username': this.state.field_user};
        sessionStorage.setItem('userInfo', JSON.stringify( userInfo ));
        window.alert(userInfo['username'] + ': Log In Succeeded！');
        this.props.history.push('/blog/'+this.state.field_user);
      } else { 
        console.log(res.data);
        window.alert(res.data);
        this.setState({
          error: true,
          field_user: "",
        });
      }
    })
    .catch(function (error) {
      console.log(error);
    })

  };

  signInPage = e => {
    this.props.history.push('/signin');
  }

  render() {
    return (
      <Dialog open style = {{backgroundImage:'url("/assets/login.jpg")', backgroundSize: "cover"}} onRequestClose={this.LoginPage} fullScreen={this.props.fullScreen}>
        <DialogTitle>Log In Block</DialogTitle>
        <DialogContent>
            <DialogContentText>Please Enter Your Name</DialogContentText>
            <TextField autoFocus error={this.state.error} margin="dense" id="username" label="Name" type="username"
            value={this.state.field_user} onChange={this.handleChange('field_user')} fullWidth/>
        </DialogContent>
        <DialogActions>
            <Button onClick={this.signInPage} color="secondary">Sign In</Button>
            <Button onClick={this.logInPage} color="primary">Log In</Button>
        </DialogActions>
    </Dialog>
    );
  }
}
export default Login;
