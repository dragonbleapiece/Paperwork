import React, { Component } from 'react';
import Box from '../Box/Box';
import './Figure.css';
import p5 from 'p5';

/*Pencil*/
class Figure extends Box {

  constructor(props) {
    super(props);
    this.className += " " + Figure.name;
  }

  draw(sk) {

  }

  render() {
    return (
      <div className={this.className}>
        <span>{this.constructor.name}</span>
      </div>
    );
  }
}

export default Figure;
