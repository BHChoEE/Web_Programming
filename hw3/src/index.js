import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import logo from './logo.svg';

const { Component } = React;


class TodoItem extends Component {
	constructor(props){
		super(props);
		this.state = {
			value: props.value,
		};
	}
	render(){
		return(
			<div className = {this.props.className} >
				<div className="TodoItem" id = {this.props.id}>
					<input className="checkbox" type = "checkbox"/>
					<p className="content"> {this.props.value} </p>
					<p className="delete" onClick={this.destroy_itself}>X</p>
				</div>
			</div>
		);
	}
}

class TodoList extends Component {
	constructor(props){
		super(props);
		this.state = {
			name: props.name,
			todoItems: [],
			done: [],
			displaychoice: "",
		}
		this.display = this.display.bind(this);
        this.click = this.click.bind(this);
        this.count = this.count.bind(this);
	}

	push(e){
		if(e.key !== 'Enter' || e.target.value == "")
			return
		this.setState({done: [...this.state.done, false]})
		this.setState({todoItems: [...this.state.todoItems, e.target.value]});
		e.target.value="";
	}

	click(e){
		let t = e.target;
		if(t.className==='checkbox'){
            this.state.done[t.parentElement.id] = t.checked
            //this.setState({done[t.parentElement.id]: t.checked});
			this.setState({done: this.state.done});
		}
		else if(t.className==='delete'){
			this.state.todoItems.splice(t.parentElement.id, 1);
			this.setState({todoItems: this.state.todoItems});
			this.state.done.splice(t.parentElement.id, 1);
			this.setState({done: this.state.done})
		}
	}

	display(d){
		this.setState({displaychoice: d});
	}


	addTodoItem(){
		var todoItemsbox = [];
		for(let i = 0; i < this.state.todoItems.length ; ++i){
			if(!this.state.done[i]){
				todoItemsbox.push(<TodoItem className="Undone" value={this.state.todoItems[i]} key={i} id={i} />);
			}
			else{
				todoItemsbox.push(<TodoItem className="Done" value={this.state.todoItems[i]} key={i} id={i}/>);
			}
		}
		if(this.state.displaychoice==="Done")
			todoItemsbox = todoItemsbox.filter((v, i) => this.state.done[i]);
		else if(this.state.displaychoice==="Undone")
			todoItemsbox = todoItemsbox.filter((v, i) => !this.state.done[i]);
		return(
			<div>
				{todoItemsbox}
            </div>
        )	
    }
    
    count(){
        var doneNum = 0;
        for(let i = 0 ; i < this.state.done.length ;++i){
            if(this.state.done[i])
                doneNum += 1;
        }
        return(doneNum);
    }

	render(){
        
		return(
			<div className = {this.props.className}>
				<div className="TodoList" id = {this.props.id}>
					<p className="content">{this.props.name} </p>
                    <input type="text" onKeyPress={this.push.bind(this) } placeholder="Enter TodoItem name..."/>
                    <p className="deleteList" onClick={this.destroy_itself}>X</p>
                    <div onClick={this.click}> {this.addTodoItem()} </div>
                    <CountDisplay display_filter={this.display}/>
					<p className="displayDone">Done: {this.count()}</p>
                    <p className="displayUndone">Undone: {this.state.todoItems.length - this.count()}</p>
				</div>
			</div>
		);
    }
    
    

}


class CountDisplay extends Component{
    constructor(props){
        super(props);
        this.state={}
    }
    render(){
        return(
            <div>
                <button type="button" className="display" onClick={()=>this.props.display_filter("All")}>All</button>
                <button type="button" className="display" onClick={()=>this.props.display_filter("Done")}>Done</button>
                <button type="button" className="display" onClick={()=>this.props.display_filter("Undone")}>Undone</button>
            </div>
        );
    }
}

class TodoApp extends Component{
    constructor(props){
        super(props);
        this.state = {
            todoLists: [],
            todoListsbox: [],
        }
        this.click = this.click.bind(this);
        this.countDone = this.countDone.bind(this);
        this.countUndone = this.countUndone.bind(this);
    }

    render(){
        return(
            <div className="TodoApp" id="TodoApp">
                <p className = "TodoContent"> React Todo-App </p>
                <input type="text" onKeyPress={this.push.bind(this)} placeholder="Enter Your List Name" />
                <img src={logo} className="App-logo" alt="logo" />
                <p className ="TotalDone"> Total Done Items: {this.countDone()}</p>
                <p className ="TotalUndone"> Total Undone Items: {this.countUndone()}</p>
                
                <div onClick={this.click}> {this.addTodoList()} </div>
                
            </div>
        );
    }

    push(e){
        if(e.key !== 'Enter' || e.target.value == "")
			return
        this.setState({todoLists: [...this.state.todoLists, e.target.value]});
		e.target.value="";
    }

    click(e){
        let t = e.target;
		if(t.className==='deleteList'){
            this.state.todoLists.splice(t.parentElement.id, 1);
			this.setState({todoLists: this.state.todoLists});
		}
    }

    countDone(){
        var totalCount = 0;
        for(let i = 0 ; i < this.state.todoLists.length ; ++i){
            //let list = TodoApp.getElementById
            //console.log(list);
            //TODO:
        }
        return(totalCount);
    }

    countUndone(){
        var totalCount = 0;
        for(let i = 0 ; i < this.state.todoLists.length ; ++i){
            //TODO:
            
        }
        return(totalCount);
    }

    addTodoList(){
        this.state.todoListsbox = [];
		for(let i = 0; i < this.state.todoLists.length ; ++i){
            this.state.todoListsbox.push(<TodoList className="TodoList" name={this.state.todoLists[i]} id={ i }/>);
		}
		return(
			<div>
				{this.state.todoListsbox}
            </div>
        )
    }
}

ReactDOM.render(<TodoApp />, document.getElementById('root'));

registerServiceWorker();
