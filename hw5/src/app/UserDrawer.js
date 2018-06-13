import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';

const styles = {
    list: {
      width: 250,
    },
    menuButton: {
      marginLeft: -12,
      marginRight: 20,
    }
};

class UserDrawer extends React.Component{
    constructor(props){
        super(props);
        this.state = { left: false }
    }
    toggleDrawer = (side, open) => () => {
        this.setState({
          [side]: open,
        });
    };
    handleClick = (e) => {
        e.preventDefault();
        this.props.handleClick(e);
    };
    returnUser = (e) => {
        e.preventDefault();
        console.log(this.props.history);
        this.props.history.push('/blog/'+this.props.username);
        location.reload();
    }
    loginButton = () => {
        if(this.props.username === 'guest'){
            return(
                <List>
                    <ListItem button onClick = {e => this.handleClick(e)}>UserList</ListItem>
                </List>
            )
        } else {
            return(
                <List>
                    <ListItem button onClick={e => this.returnUser(e)}>Return</ListItem>
                    <ListItem button onClick={e => this.handleClick(e)}>UserList</ListItem>
                </List>
            )
        }
    }
    render() {
        const { classes } = this.props;
        
        const sideList = (
          <div className={classes.list}>
            {this.loginButton()}      
          </div>
        );
        
        return (
          <div>
            <IconButton className={classes.menuButton} onClick={this.toggleDrawer('left', true)} 
                color="inherit" aria-label="Menu">
              <MenuIcon/>
            </IconButton>
            <Drawer open={this.state.left} onClose={this.toggleDrawer('left', false)}>
              <div
                tabIndex={0}
                role="button"
                onClick={this.toggleDrawer('left', false)}
                onKeyDown={this.toggleDrawer('left', false)}
                >
                {sideList}
              </div>
            </Drawer>
          </div>
        );
    }
}

UserDrawer.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
export default withStyles(styles)(UserDrawer);