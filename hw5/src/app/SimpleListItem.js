
import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

class SimpleListItem extends React.Component{
    constructor(props){
        super(props);
    }
    handlePreviewCb = (e) => {
        e.preventDefault();
        this.props.handlePreviewCb(this.props.hashNum);
    }
    render(){
        return(
            <ListItem button divider onClick={e => this.handlePreviewCb(e)}>
                <ListItemText inset primary = {this.props.title} secondary = {this.props.time}/>
            </ListItem>
        );
    }
}

export default SimpleListItem;