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
    document.title = "Sign In";
  }
  componentWillMount = () => {
    console.log("componentWillMount()");
    var retrievedObject = sessionStorage.getItem('userInfo');
    if(retrievedObject != null) {
      window.alert(retrievedObject + '\nLog in Redirect to Main...');
      var username = JSON.parse(retrievedObject)['username'];
      this.props.history.push('/blog/' + username);
    }
  };
  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
      error: false
    });
  };
  SignInPage = e => {
    var re = RegExp('^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$');
    if(this.state.field_user.match(re) === null) {
      window.alert('Username must contain only English word and number!!');
      this.setState({
        error: true,
        field_user: ""
      });
      return;
    }  
    axios.post('/user/signin', {
      username: this.state.field_user,
      updateTime: Date()
    })
    .then( (res) => {
        if(res.data._message == null){
          var username = res.data.username;
          window.alert('Sign In Successfully！' + username);
          this.loginPage();
        }else{
          console.log(res.data._message);
          window.alert(res.data._message+'(already user or invalid');
          this.setState({
            error: true,
            field_user: "",
          })
        }
    })
    .catch(function (err) {
      console.log(err);
    });  
  };

  loginPage = e => {
    this.props.history.push('/login');
  }

  render() {
    return (
      <Dialog open style = {{backgroundImage:'url("/assets/SignIn.jpg")', backgroundSize: "cover"}} onRequestClose={this.SignInPage} fullScreen={this.props.fullScreen}>
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
