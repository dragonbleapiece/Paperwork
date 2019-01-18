import React, { Component } from 'react';
import './Triangle.css';
import Figure from '../Figure';

/*Pencil*/
class Triangle extends Figure {

  constructor(props) {
    super(props);
    this.className += " " + Triangle.name;
    const {width, height} = this.props;
    this.x = 0;
    this.y = height;
    this.width = width;
    this.height = height ? height : width;
  }

  draw(sk) {
    sk.triangle(this.x, this.y, this.x + this.width, this.y, (this.x + this.width) / 2, this.y - this.height);
  }

  render() {
    return (
      <div className={this.className}>
        <span>{this.constructor.name}</span>
      </div>
    );
  }
}

export default Triangle;
