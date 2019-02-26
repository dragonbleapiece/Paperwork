import React, { Component } from 'react';
import Box from '../Box/Box';
import './Loop.css';

const className = "Loop";
const unauthorized = [];

/*Pencil*/
class Loop extends Box {

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
    this.className += " " + Loop.className;
    this.nbIterations = 10;
  }

  draw(sk) {
    for(let i = 0; i < this.nbIterations; ++i) {
      if(this.next !== undefined) {
        this.next.draw(sk);
      }
    }
  }
}

export default Loop;
