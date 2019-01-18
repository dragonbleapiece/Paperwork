import React, { Component } from 'react';
import Transform from '../Transform';
import './Color.css';
import p5 from 'p5';

/*Pencil*/
class Color extends Transform {

  constructor(props) {
    super(props);
    this.className += " " + Color.name;
    const {r, g, b, a} = this.props;
    this.r = r;
    this.g = g;
    this.b = b;
    this.a = a ? a : 255;
  }

  draw(sk) {
    let c = sk.color(r, g, b, a);
    sk.fill(c);
  }

  render() {
    return (
      <div className={this.className}>
        <span>{this.constructor.name}</span>
      </div>
    );
  }
}

export default Color;
