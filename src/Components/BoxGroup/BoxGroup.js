import React, { Component } from 'react';
import './BoxGroup.css';
import Box from '../Box/Box';
import {shallow, instance} from 'enzyme';
import p5 from 'p5';
import DropBox from '../DropBox/DropBox';
import DragBox from '../DragBox/DragBox';
import ContextMenuBox from '../ContextMenuBox/ContextMenuBox';

/*Pencil*/
class BoxGroup extends Box {

  constructor(props) {
    super(props);
    this.className = BoxGroup.name;
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
    for(let i = 0; i < this.elements.length; ++i) {
       let element = this.elements[i];
       element.draw(sk);
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
      <child.type key={child.id} id={child.id} parent={this} ref={el => this.elements[index] = el} icon={this.icon[index]}/>
    );


    return children;
  }

  renderBox() {
    return;
  }

  render() {

    return (
      <div className={this.className} style={this.state.style}>
        <ContextMenuBox id={this.constructor.name + this.props.id} unauthorized={this.unauthorized} el={this}>
          <DragBox icon={this.props.icon} name={this.constructor.name} onClose={this.removeFromParent.bind(this)} className={this.className} el={this}>
            <span className="Box__content">
              {this.renderBox()}

              <DropBox>
                {this.unauthorized.indexOf("*") === -1 && <div className="Box__container">
                  {!this.state.children.length && <span className="Box__placeholder">Right click to add</span>}
                  {this.getChildren()}
                </div>}
              </DropBox>
            </span>

          </DragBox>
        </ContextMenuBox>
      </div>
    );
  }
}

export default BoxGroup;
