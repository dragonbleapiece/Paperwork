import React, { Component } from 'react';
import Color from './Color';
import p5 from 'p5';

/*Pencil*/
class Red extends Color {

  constructor(props) {
    super(props);
    this.r = 255;
    this.g = 0;
    this.b = 0;
    this.a = 255;
  }
}

export default Red;
