import React, { Component } from 'react';
import './Box.css';
import p5 from 'p5';
import DragBox from '../DragBox/DragBox';
import ContextMenuBox from '../ContextMenuBox/ContextMenuBox';

/*Pencil*/
class Box extends Component {


  state = {
    children: [],
    style: {}
  };

  constructor(props) {
    super(props);
    this.className = Box.name;
    this.next = undefined;
    this.nextType = undefined;
    this.unauthorized = [];
    this.icon = [];
  }

  addChild(child) {
    if(!child) return;
    let obj = new child(); //tricky
    if(window.isAuthorized(child, this.unauthorized) && obj instanceof Box) {
      this.setState({
        children: [child]
      });
    }
  }

  addNext(elmnt) {
    if(elmnt !== undefined) {
      if(elmnt instanceof Box) {
        this.next = elmnt;
        this.nextType = elmnt.constructor.name;
      }
    }
  }

  addIcon(icon) {
    this.icon.push(icon);
  }

  setStyle(style) {
    this.setState({
      style: style
    });
  }

  draw(sk) {

  }

  getChildren() {
    let children = [];

    if(this.state.children.length > 0) {
      let Component = this.state.children[0];
      children.push(<Component key={0} ref={el => {this.next = el; console.log(el);}} icon={this.icon[0]}/>);
    }
    return children;
  }

  renderBox() {
    return (
      <>
        {this.getChildren()}
      </>
    );
  }

  render() {
    return (
      <div className={this.className} style={this.state.style}>
        <ContextMenuBox id={this.constructor.name} unauthorized={this.unauthorized} el={this}>
          <DragBox icon={this.props.icon} name={this.constructor.name} el={this}>
          <span className="Box__content">
            {this.renderBox()}
          </span>
          </DragBox>
        </ContextMenuBox>
      </div>
    );
  }
}

export default Box;
