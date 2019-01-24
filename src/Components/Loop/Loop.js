import React, { Component } from 'react';
import Box from '../Box/Box';
import './Loop.css';

/*Pencil*/
class Loop extends Box {

  constructor(props) {
    super(props);
    this.className += " " + Loop.name;
    this.nbIterations = 10;
  }

  draw(sk) {
    for(let i = 0; i < this.nbIterations; ++i) {
      if(this.next !== undefined) {
        this.next.draw();
      }
    }
  }
}

export default Loop;
