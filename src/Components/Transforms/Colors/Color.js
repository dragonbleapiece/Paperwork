import React, { Component } from 'react';
import Transform from '../Transform';
import './Color.css';
import p5 from 'p5';

/*Pencil*/
class Color extends Transform {

  constructor(props) {
    super(props);
    this.className += " " + Color.name;
    this.r = 0;
    this.g = 0;
    this.b = 0;
    this.a = 255;
    this.unauthorized = ["Placement", "Color"];
  }

  draw(sk) {
    let c = sk.color(this.r, this.g, this.b, this.a);
    sk.fill(c);
    if(this.next !== undefined) {
      this.next.draw(sk);
    }
  }

}

export default Color;
