import React, { Component } from 'react';
import './BoxGroup.css';
import Box from '../Box/Box';
import {shallow, instance} from 'enzyme';
import p5 from 'p5';
import DropBox from '../DropBox/DropBox';
import DragBox from '../DragBox/DragBox';
import ContextMenuBox from '../ContextMenuBox/ContextMenuBox';
import { ContextMenuTrigger } from "react-contextmenu";

const className = "BoxGroup";
const unauthorized = [];

/*Pencil*/
class BoxGroup extends Box {

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
    this.className = BoxGroup.className;
    this.elements = [];
  }

  addChild(child) {

    if(!child) return;
    let obj = new child(); //tricky
    let children = this.state.children;
    if(obj instanceof Box && this.isAuthorized(child)) {
      this.setState({
        children: [...this.state.children, {type:this.beforeAddChild(child), id:Box.id}]
      });
    }
  }

  pushChild(child) {
    if(!child || !("type" in child) || !("id" in child)) return;
    let obj = new child.type(); //tricky
    if(this.isAuthorized(child.type) && obj instanceof Box) {
      let children = this.state.children;
      children.push(child);
      console.log(child);
      this.setState({
        children: children
      });
    }
  }

  setChildren(children) {
    this.elements = [];
    super.setChildren(children);
  }

  draw(sk) {
    let el = this.elements;
    for(let i = 0; i <el.length; ++i) {
       let element = el[i];
       sk.push();
         this.drawBeforeChild(sk, element);
         if(element) element.draw(sk);
        sk.pop();
    }
  }

  initElements(instance = Box, callback = function() {}) {

    let elements = [];

    const children = React.Children.map(this.props.children,
       (child, index) => {
              elements.push(child);
              //box.parent = callback;
    });

  }

  componentDidMount() {
    //this.initElements();
  }

  getChildren() {
    this.elements = [];
    let children = this.state.children.map((child, index) =>
      <child.type key={child.id} id={child.id} parent={this} ref={el => {if(el) this.elements[index] = el.ref;}} saveState={(state) => {child.state = state}} state={child.state}/>
    );


    return children;
  }

  renderBox() {
    return null;
  }

  render() {

    const renderBox = this.renderBox() ? true : false;

    return (
      <div className={this.className} style={this.state.style}>
        <ContextMenuBox id={this.constructor.className + this.props.id} suppMenu={this.suppMenu} unauthorized={this.constructor.unauthorized} el={this}>
          <DragBox icon={this.constructor.icon} name={this.constructor.className} onClose={this.removeFromParent.bind(this)} className={this.className} el={this}>
            <span className="Box__content">
              {renderBox && <ContextMenuTrigger id={""}>
                {this.renderBox()}
              </ContextMenuTrigger>}
              <DropBox el={this}>
                <ContextMenuTrigger id={this.constructor.className + this.props.id} holdToDisplay={-1}>
                  {this.constructor.unauthorized.indexOf("*") === -1 && <div className="Box__container">
                    {!this.state.children.length && <span className="Box__placeholder">Right click to add</span>}
                    {this.getChildren()}
                  </div>}
                </ContextMenuTrigger>
              </DropBox>
            </span>
          </DragBox>
        </ContextMenuBox>
      </div>
    );
  }
}

export default BoxGroup;
