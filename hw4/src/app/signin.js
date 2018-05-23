import React from 'react';
import {Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions, Button } from '@material-ui/core'
import axios from 'axios';

class SignIn extends React.Component {
  constructor() {
    super();
    this.state = {
      field_user: "",
      error: false
    };
  }
  componentWillMount = () => {
    console.log("componentWillMount()");
    var retrievedObject = sessionStorage.getItem('userInfo');
    if(retrievedObject != null) {
      window.alert(retrievedObject + '\nLog in Redirect to Chatrrom...');
      window.location = '/ChatLobby';
    }
  };
  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
      error: false
    });
  };
  SignInPage = e => {
    axios.post('/user/signin', {
      username: this.state.field_user,
      updateTime: Date()
    })
    .then( (res) => {
        var username = res.data.username;
        window.alert('Sign In Successfully！' + username);
        this.loginPage();
    })
    .catch(function (err) {
      console.log(err);
    });  
  };

  loginPage = e => {
    axios.get('/redirect?page=login')
    .then(function (res) {
      console.log(res);
      window.location = '/login';
    })
    .catch(function (err) {
      console.log(err);
    });  
  }

  render() {
    return (
      <Dialog open onRequestClose={this.SignInPage} fullScreen={this.props.fullScreen}>
        <DialogTitle>Sign In</DialogTitle>
        <DialogContent>
          <DialogContentText>Please Enter Your Name</DialogContentText>
          <TextField autoFocus error={this.state.error} margin="dense" id="username" label="Name" type="username"
            value={this.state.field_user} onChange={this.handleChange('field_user')} fullWidth/>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.loginPage} color="secondary">Return</Button>
          <Button onClick={this.SignInPage} color="primary">Confirm</Button>
        </DialogActions>
      </Dialog>
    );
  }
}
export default SignIn;
