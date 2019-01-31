import React, { Component } from 'react';
import './HHatching.css';
import Hatching from '../Hatching';
import HHatchingIcon from '../../../../Icons/HHatching.svg';

/*Pencil*/
class HHatching extends Hatching {

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

HHatching.className = "HHatching";
HHatching.icon = HHatchingIcon;

export default HHatching;
