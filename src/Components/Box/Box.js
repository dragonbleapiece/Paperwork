import React, { Component } from 'react';
import './Box.css';
import p5 from 'p5';
import DropBox from '../DropBox/DropBox';
import DragBox from '../DragBox/DragBox';
import ContextMenuBox from '../ContextMenuBox/ContextMenuBox';
import { ContextMenuTrigger } from "react-contextmenu";
import Color from '../Colors/Color';

const menuColor = [
  {
    type: 'Color',
    elements: [
      {type: 'Blue'},
      {type: 'Cyan'},
      {type: 'Magenta'},
      {type: 'Yellow'},
      {type: 'Black'},
      {type: 'White'}
    ]
  }
];


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
    this.suppMenu = [{
      menu: menuColor,
      handleClick: (event, data) => {
       if(data.type) {
         let color = window.getClassFromName(data.type);
         if(color) this.setState({color: new color()});
         window.updateWorkspace();
       }
      }
    }];
    this.state.color = new Color(255, 255, 255);
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
    children = children.filter(el => el.id !== this.props.id);
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
      children.push(<child.type key={child.id} parent={this} id={child.id} ref={el => {this.next = el}}/>);
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
          <DragBox icon={this.constructor.icon} name={this.constructor.className} onClose={this.removeFromParent.bind(this)} el={this}>
            <span className="Box__content">
              {this.renderBox()}
              <DropBox>
              {this.unauthorized.indexOf("*") === -1 && <ContextMenuBox id={this.constructor.className + this.props.id} unauthorized={this.unauthorized} suppMenu={this.suppMenu} el={this}>
                <div className="Box__container">
                  {!this.state.children.length && <span className="Box__placeholder">Right click to add</span>}
                  {this.getChildren()}
                </div>
              </ContextMenuBox>}
              </DropBox>
            </span>
          </DragBox>
        </ContextMenuTrigger>
      </div>
    );
  }
}

Box._id = 0; //or use shortid ?
Box.className = "Box";
Box.icon = undefined;

export default Box;
