import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import UserDrawer from './UserDrawer';
const styles = {
    root: {
        flexGrow: 1,
    },
    flex: {
        flex: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
};

class ButtonAppBar extends React.Component {
    constructor(props){
        super(props);
        this.state = {};
    }
    handleClick = (e) => {
        this.props.handleClick(e);
    };
    render(){
        const { classes } = this.props;
        return (
            <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                <UserDrawer 
                    username={this.props.username} 
                    history={this.props.history} 
                    handleClick={e => this.handleClick(e)}/>
                <Typography variant="title" color="inherit" className={classes.flex}>
                    Blog
                </Typography>
                <Typography variant="title" color="inherit" className={classes.flex}>
                    {this.props.username}
                </Typography>
                <Button color="inherit">LogOut</Button>
                </Toolbar>
            </AppBar>
            </div>
        );
    }
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ButtonAppBar);