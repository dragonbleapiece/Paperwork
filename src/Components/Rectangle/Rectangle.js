import React, { Component } from 'react';
import './Rectangle.css';
import '../Box/Box';

/*Pencil*/
class Rectangle extends Box {

  constructor(props) {
    super(props);
    this.className += " " + this.constructor.name;
    const {x, y, width, height} = this.props;
    this.x = x;
    this.y = y;
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
