import React, { Component } from 'react';
import Box from '../Box/Box';
import './Placement.css';
import shortid from 'shortid';
import Workspace from '../Workspace/Workspace';

const className = "Placement";
const unauthorized = ["Placement"];

/*Pencil*/
class Placement extends Box {

  static get className() {
    return className;
  }

  static get icon() {
    return undefined;
  }

  static get unauthorized() {
    return [...super.unauthorized, ...unauthorized];
  }

  constructor(props) {
    super(props);
    this.className += " " + Placement.className;
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

  initState() {
    super.initState();
    this.state.currentMode = undefined;
    this.state.mode = null;
  }

  getTransforms() {
    return null;
  }

  renderMode() {
    if(!this.state.mode) return null;
    return (<this.state.mode key={this.constructor.className + this.state.mode.className} ref={el => {this.state.currentMode = el}} />);
  }

  draw(sk) {

  }
}

export default Placement;
