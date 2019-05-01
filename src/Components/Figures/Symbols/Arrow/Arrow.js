import React, { Component } from 'react';
import './Arrow.css';
import Symbol from '../Symbol';
import arrow_right from '../../../../Icons/arrow_right.svg';

const className = "Arrow";
const unauthorized = [];

/*Pencil*/
class Arrow extends Symbol {

  static get className() {
    return className;
  }

  static get icon() {
    return arrow_right;
  }

  static get unauthorized() {
    return [...super.unauthorized, ...unauthorized];
  }

  constructor(props) {
    super(props);
    this.className += " " + Arrow.className;
    this.x = 0;
    this.y = 0;
    this.width = 1;
    this.height = 1;
  }

  drawFigure(sk) {
    /*const x = this.x;
    const y = this.y;
    const width = this.width;
    const height = this.height;

    sk.loadSVG(arrow, img =>
      sk.image(img, x, y, width, height)
    );*/
    sk.stroke(this.state.color.getP5Color(sk));
    sk.line(this.x, this.y + 1/2 * this.height, this.x + this.width, this.y + 1/2 * this.height);
    sk.line(this.x + 3/4 * this.width, this.y + 3/4 * this.height, this.x + this.width, this.y + 1/2 * this.height);
    sk.line(this.x + this.width, this.y + 1/2 * this.height, this.x + 3/4 * this.width, this.y + 1/4 * this.height);
    sk.noStroke();
  }
}


export default Arrow;
