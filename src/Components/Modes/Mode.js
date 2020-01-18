import React, { Component } from 'react';
import ContextMenuBox from '../ContextMenuBox/ContextMenuBox';
import shortid from 'shortid';
import './Mode.css';

/*Pencil*/
class Mode extends Component {

  state = {
  };


  constructor(props) {
    super(props);
    this.className = Mode.className;
    this.id = shortid.generate();
    this.modes = [];
    this.handleClick = this.props.handleClick || ((event, data) => {});
  }

  mode(sk, data) {

  }

  render() {
    console.log(this.modes);
    return (
      <div className="gridMode">
        <ContextMenuBox id={this.constructor.className + this.id} menu={[{menu: this.modes, handleClick: this.props.handleClick}]}>
          <span className="gridMode__label"> Grid Distribution </span>
          <span className="gridMode__text"> {this.constructor.className} </span>
        </ContextMenuBox>
      </div>
      );
  }
}

Mode.className = "Mode";

export default Mode;
