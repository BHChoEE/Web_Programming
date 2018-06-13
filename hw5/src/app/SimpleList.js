import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import SimpleListItem from './SimpleListItem';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    padding: 12,
    margin: theme.spacing.unit * 6,
  },
});

class  SimpleList extends React.Component{
    constructor(props){
        super(props);
    }
    handlePreviewCb = (key) => {
        this.props.handlePreviewCb(key);
    }
    handleClick = (e) => {}
    render(){
        const { classes } = this.props;
        var list = this.props.postList.map(item => (
                <SimpleListItem
                    hashNum = {item.hash}
                    key = {item.hash}
                    title = {item.title}
                    time = {item.time}
                    handlePreviewCb = {this.handlePreviewCb}
                />)
        );
        return (
            <div className={classes.root}>
            <List component="nav" subheader = {<ListSubheader component = 'div'>Post List</ListSubheader>}>
                {list}
            </List>
            </div>
        );
    }
}

SimpleList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleList);