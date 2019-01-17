import React, { Component } from 'react';
import './Instructions.css';
import Canvas from '../Canvas/Canvas';
import Box from '../Box/Box';

class Instructions extends Component {

  static _instance;
  static addElement(elmnt) {
    Instructions._instance.addElement(elmnt);
  }

  constructor(props) {
    if(Instructions._instance !== undefined) {
      return Instructions._instance;
    }
    super(props);
    this.elements = [];
    Instructions._instance = this;
  }

  addElement(elmnt) {
    this.elements.push(elmnt);
  }

  componentDidMount() {
    let canvas = new Canvas();
    let next = undefined;
    let children = this.elements.reverse();

    if(children !== undefined) {
      for(let i = 0; i < children.length; ++i) {
        let child = children[i];
        if(child instanceof Box) {
          child.next = next;
          next = child;
        }
      }

      canvas.addDraw(children[children.length - 1].draw.bind(children[children.length - 1]));
    }
  }

  render() {
    return (
      <div className={this.props.className}>
      {this.props.children}
      </div>
    );
  }
}

Instructions._instance = undefined;

export default Instructions;
