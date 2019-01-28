import React, { Component } from 'react';
import './Box.css';
import p5 from 'p5';
import DragBox from '../DragBox/DragBox';
import ContextMenuBox from '../ContextMenuBox/ContextMenuBox';
import { ContextMenuTrigger } from "react-contextmenu";

/*Pencil*/
class Box extends Component {

  static get id() {
    return Box._id++;
  }

  state = {
    children: [],
    style: {}
  };

  constructor(props) {
    super(props);
    this.className = Box.className;
    this.name = Box.className;
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
        children: [{type:child, id:Box.id}]
      });
    }
  }

  setChildren(children) {
    this.setState({
      children: children
    })
  }

  removeFromParent() {
    let children = this.props.parent.state.children;
    children.splice(children.findIndex(el => el.id === this.id), 1);
    console.log(children);
    this.props.parent.setChildren(children);
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
    this.next = undefined;
    let children = [];

    if(this.state.children.length > 0) {
      let child = this.state.children[0];
      children.push(<child.type key={child.id} parent={this} id={child.id} ref={el => {this.next = el}} icon={this.icon[0]}/>);
    }
    return children;
  }

  renderBox() {
    return null;
  }

  render() {
    return (
      <div className={this.className} style={this.state.style}>
        <ContextMenuTrigger>
          <DragBox icon={this.props.icon} name={this.constructor.className} onClose={this.removeFromParent.bind(this)} el={this}>
            <span className="Box__content">
              {this.renderBox()}

              {this.unauthorized.indexOf("*") === -1 && <ContextMenuBox id={this.constructor.className + this.props.id} unauthorized={this.unauthorized} el={this}>
                <div className="Box__container">
                  {!this.state.children.length && <span className="Box__placeholder">Right click to add</span>}
                  {this.getChildren()}
                </div>
              </ContextMenuBox>}
            </span>
          </DragBox>
        </ContextMenuTrigger>
      </div>
    );
  }
}

Box._id = 0; //or use shortid ?
Box.className = "Box";

export default Box;
