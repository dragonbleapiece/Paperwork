import React, { Component } from 'react';
import './Rectangle.css';
import Box from '../Box/Box';

/*Pencil*/
class Rectangle extends Box {

  constructor(props) {
    super(props);
    this.className += " " + Rectangle.name;
    const {width, height} = this.props;
    this.x = 0;
    this.y = 0;
    this.width = width;
    this.height = height;
  }

  draw(sk) {
    sk.rect(this.x, this.y, this.width, this.height);
  }

  render() {
    return (
      <div className={this.className}>
        <span>{this.constructor.name}</span>
      </div>
    );
  }
}

export default Rectangle;
