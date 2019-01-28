import React, { Component } from 'react';
import Color from './Color';
import p5 from 'p5';

/*Pencil*/
class Green extends Color {

  constructor(props) {
    super(props);
    this.r = 0;
    this.g = 255;
    this.b = 0;
    this.a = 255;
  }

}

Green.className = "Green";

export default Green;
