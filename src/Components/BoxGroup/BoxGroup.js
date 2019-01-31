import React, { Component } from 'react';
import './BoxGroup.css';
import Box from '../Box/Box';
import {shallow, instance} from 'enzyme';
import p5 from 'p5';
import DropBox from '../DropBox/DropBox';
import DragBox from '../DragBox/DragBox';
import ContextMenuBox from '../ContextMenuBox/ContextMenuBox';
import { ContextMenuTrigger } from "react-contextmenu";


/*Pencil*/
class BoxGroup extends Box {

  constructor(props) {
    super(props);
    this.className = BoxGroup.className;
    this.elements = [];
  }

  addChild(child) {

    if(!child) return;
    let obj = new child(); //tricky
    if(this.unauthorized.indexOf(child.name) === -1 && obj instanceof Box) {
      let children = this.state.children;
      children.push({type: child, id: Box.id});
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
       if(element) element.draw(sk);
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
      <child.type key={child.id} id={child.id} parent={this} ref={el => this.elements[index] = el}/>
    );


    return children;
  }

  renderBox() {
    return;
  }

  render() {

    return (
      <div className={this.className} style={this.state.style}>
          <ContextMenuTrigger>
            <DragBox icon={this.constructor.icon} name={this.constructor.className} onClose={this.removeFromParent.bind(this)} className={this.className} el={this}>
              <span className="Box__content">
                {this.renderBox()}
                <DropBox>
                  {this.unauthorized.indexOf("*") === -1 && <ContextMenuBox id={this.constructor.className + this.props.id} suppMenu={this.suppMenu} unauthorized={this.unauthorized} el={this}>
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

BoxGroup.className = "BoxGroup";
BoxGroup.icon = undefined;

export default BoxGroup;
