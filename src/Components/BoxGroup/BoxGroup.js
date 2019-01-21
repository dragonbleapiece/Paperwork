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
    this.initElements();
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
