import React, { Component } from 'react';
import './BoxGroup.css';
import Box from '../Box/Box';
import {shallow, instance} from 'enzyme';
import p5 from 'p5';
import DropBox from '../DropBox/DropBox';
import DragBox from '../DragBox/DragBox';

/*Pencil*/
class BoxGroup extends Box {

  constructor(props) {
    super(props);
    this.className = BoxGroup.name;
    this.state.elements = [];
  }

  setElements(elmnts) {
    if(elmnts !== undefined) {
      this.setState({
        elements: elmnts
      });
    }
  }

  addElement(elmnt) {
    if(elmnt !== undefined && this.unauthorized.indexOf(elmnt) == -1) {
      let elements = this.state.elements;
      elements.push(elmnt);
      this.setState({
        elements: elements
      });
    }
  }

  addChild(child) {

    if(!child) return;
    let obj = new child(); //tricky
    if(this.unauthorized.indexOf(child.name) === -1 && obj instanceof Box) {
      let children = this.state.children;
      children.push(child);
      this.setState({
        children: children
      });
    }
  }

  draw(sk) {
    for(let i = 0; i < this.state.elements.length; ++i) {
       let element = this.state.elements[i];
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

    this.setElements(elements);
  }

  componentDidMount() {
    //this.initElements();
  }

  getChildren() {
    let children = [];
    for(let i = 0; i < this.state.children.length; ++i) {
      let Component = this.state.children[i];
      children.push(<Component key={i} ref={el => this.elements[i] = el} icon={this.icon[i]}/>);
    }
    console.log(this.icon[0]);
    return children;
  }

  render() {

    return (
      <DragBox name={this.constructor.name} className={this.className}>
        <DropBox>
          {this.props.chidren}
        </DropBox>
      </DragBox>
    );
  }
}

export default BoxGroup;
