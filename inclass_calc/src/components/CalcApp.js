import React from 'react';

import CalcButton from './CalcButton';
// 計算機 App
class CalcApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
	  // TODO
	  display: 0,
	  opPressed: false,
	  save_num: null,
	  save_op: null,
	};
	this.numClick = this.numClick.bind(this);
	this.opClick = this.opClick.bind(this);
  }

  resetState() {
	// TODO
	this.setState({
		display: 0,
		opPressed: false,
		save_num: null,
		save_op: null
	});
  }
  numClick(event){
	var num =  event.target.innerHTML;
	var displayNum = this.state.display;
	if(this.state.opPressed){
		this.setState({save_num: this.state.display});
		displayNum = 0;
	}
	
	if(this.state.display === 0){
		this.setState({display: num});
	}
	else{
		this.setState({display: parseInt(displayNum * 10) + parseInt(num) });
	}
	
	
	this.setState({opPressed: false});
  }

  opClick(event){
	var op = event.target.innerHTML;
	if(this.state.save_num === null)
		this.setState({save_op: op});
	else if(this.state.opPressed)
		this.setState({save_op: op});
	else{
		var former = parseInt(this.state.save_num);
		var latter = parseInt(this.state.display);
		var op_ = this.state.save_op;
		var result = 0;
		if(op_ === '+'){
			result = former + latter;
		}
		else if(op_ === '-'){
			result = former - latter;
		}
		else if(op_ === 'x'){
			result = former * latter;
		}
		else if(op_ === '÷'){
			if(latter === 0)
				alert("cant divide by zero!!!");
			else
				result = Math.floor(former/latter);
		}
		this.setState({
			display: result,
			save_op: op
		})
	}
	this.setState({opPressed: true});
  }

  showNotImplemented() {
    console.warn('This function is not implemented yet.');
  }

  render() {
    return (
      <div className="calc-app">
        <div className="calc-container">
          <div className="calc-output">
            <div className="calc-display">{this.state.display}</div>
          </div>
          <div className="calc-row">
            <CalcButton onClick={this.resetState.bind(this)}>AC</CalcButton>
            <CalcButton onClick={this.showNotImplemented.bind(this)}>+/-</CalcButton>
            <CalcButton onClick={this.showNotImplemented.bind(this)}>%</CalcButton>
            <CalcButton className="calc-operator" onClick = {this.opClick}>÷</CalcButton>
          </div>
          <div className="calc-row">
            <CalcButton className="calc-number" onClick = {this.numClick}>7</CalcButton>
            <CalcButton className="calc-number" onClick = {this.numClick}>8</CalcButton>
            <CalcButton className="calc-number" onClick = {this.numClick}>9</CalcButton>
            <CalcButton className="calc-operator" onClick = {this.opClick}>x</CalcButton>
          </div>
		  <div className="calc-row">
            <CalcButton className="calc-number" onClick = {this.numClick}>4</CalcButton>
            <CalcButton className="calc-number" onClick = {this.numClick}>5</CalcButton>
            <CalcButton className="calc-number" onClick = {this.numClick}>6</CalcButton>
            <CalcButton className="calc-operator" onClick = {this.opClick}>-</CalcButton>
          </div>
		  <div className="calc-row">
            <CalcButton className="calc-number" onClick = {this.numClick}>1</CalcButton>
            <CalcButton className="calc-number" onClick = {this.numClick}>2</CalcButton>
            <CalcButton className="calc-number" onClick = {this.numClick}>3</CalcButton>
            <CalcButton className="calc-operator" onClick = {this.opClick}>+</CalcButton>
          </div>
		  <div className="calc-row">
            <CalcButton className="bigger-btn" onClick = {this.numClick}>0</CalcButton>
            <CalcButton className="calc-number">.</CalcButton>
            <CalcButton className="calc-operator" onClick = {this.opClick}>=</CalcButton>
          </div>
        </div>
      </div>
    );
  }
}

export default CalcApp;
