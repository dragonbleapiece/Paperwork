import React, { Component } from 'react';
import Color from './Color';
import p5 from 'p5';

/*Pencil*/
class Blue extends Color {

  constructor(props) {
    super(props);
    this.r = 0;
    this.g = 0;
    this.b = 255;
    this.a = 255;
  }

}

export default Blue;
