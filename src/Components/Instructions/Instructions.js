import React, { Component } from 'react';
import './Instructions.css';
import Canvas from '../Canvas/Canvas';
import Box from '../Box/Box';
import BoxGroup from '../BoxGroup/BoxGroup';

class Instructions extends BoxGroup {

  static _instance;
  static addElement(elmnt) {
    if(Instructions._instance !== undefined) {
      Instructions._instance.addElement(elmnt);
    }
  }

  constructor(props) {
    if(Instructions._instance !== undefined) {
      return Instructions._instance;
    }
    super(props);
    this.className = this.constructor.name;
    Instructions._instance = this;
  }

  componentDidMount() {
    console.log(this.elements);
    let canvas = new Canvas();
    let next = undefined;
    let children = this.elements.reverse();

    if(children.length > 0) {
      for(let i = 0; i < children.length; ++i) {
        let child = children[i];
        if(child instanceof Box) {
          child.addNext(next);
          next = child;
        }
      }

      canvas.sendDraw(children[children.length - 1].draw.bind(children[children.length - 1]));
    }
  }

  render() {
    return (
      <div className={this.className}>
      {this.initElements()}
      </div>
    );
  }
}

Instructions._instance = undefined;

export default Instructions;
