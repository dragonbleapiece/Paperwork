import React, { Component } from 'react';
import Box from '../Box/Box';
import './Placement.css';
import shortid from 'shortid';
import Workspace from '../Workspace/Workspace';


/*Pencil*/
class Placement extends Box {

  constructor(props) {
    super(props);
    this.className += " " + Placement.className;
    this.state.currentMode = undefined;
    this.state.mode = null;
    this.suppMenu.push({
      menu: undefined,
      handleClick: (event, data) => {
        if(data.type) {
          this.setState({mode: window.getClassFromName(data.type)})
          Workspace.forceUpdate();
        }
      }
    });
    this.suppMenu[this.suppMenu.length - 1].handleClick.bind(this);
  }

  renderMode() {
    if(!this.state.mode) return null;
    console.log(this.state.mode);
    return (<this.state.mode key={this.constructor.className + this.state.mode.className} ref={el => {this.state.currentMode = el}} />);
  }

  draw(sk) {

  }
}

Placement.className = "Placement";
Placement.icon = undefined;

export default Placement;
