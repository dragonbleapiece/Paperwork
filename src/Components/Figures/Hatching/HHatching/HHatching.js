import React, { Component } from 'react';
import './HHatching.css';
import Hatching from '../Hatching';
import HHatchingIcon from '../../../../Icons/HHatching.svg';

const className = "HHatching";
const unauthorized = [];

/*Pencil*/
class HHatching extends Hatching {

  static get className() {
    return className;
  }

  static get icon() {
    return HHatchingIcon;
  }

  static get unauthorized() {
    return [...super.unauthorized, ...unauthorized];
  }

  constructor(props) {
    super(props);
    this.className += " " + HHatching.className;
    this.x = 0;
    this.y = 0;
    this.width = 1;
    this.height = 1;
  }

  drawFigure(sk) {
    let gapY = this.height / this.density;
    for(var j = 0; j <= this.density ; j++){
      sk.line(this.x, this.y + j * gapY, this.x + this.width, this.y + j * gapY);
    }
  }

}

export default HHatching;
