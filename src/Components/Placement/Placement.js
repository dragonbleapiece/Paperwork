import React from 'react';
import Box from '../Box/Box';
import './Placement.css';
import Workspace from '../Workspace/Workspace';
import White from '../Colors/White';

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
  }

  handleClick(event, data) {
    if(data.type) {
      this.setState({mode: window.getClassFromName(data.type), color: new White()})
      Workspace.forceUpdate();
    }
  }

  doBeforeSetChildren(children) {
    this.state.color = new White(); // reload the state anyway
    return super.doBeforeSetChildren(children);
  }

  initStateFromSavedState() {
    super.initStateFromSavedState();
    if(typeof this.state.mode === 'string') {
      this.state.mode = window.getClassFromName(this.state.mode);
    }
  }

  static boxToJSON(constructor, state) {
    const superJSON = super.boxToJSON(constructor, state);
    return {...superJSON, state: {...superJSON.state, currentMode: undefined, mode: state.mode.className}};
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
    return (<this.state.mode key={this.constructor.className + this.state.mode.className} handleClick={this.handleClick.bind(this)} ref={el => {this.state.currentMode = el}} />);
  }

  draw(sk) {

  }
}

export default Placement;
