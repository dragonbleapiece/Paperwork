import React, { Component } from 'react';
import './Arrow.css';
import Symbol from '../Symbol';
import arrow_right from '../../../../Icons/arrow_right.svg';
import Paper from 'paper';

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
    this.headLength = 0.20;
    this.tailLength = 0.09;
    this.headAngle = 35;
    this.tailAngle = 110;
  }

  drawFigure(sk) {

    const end = new Paper.Point(this.width, this.height / 2);
    const start = new Paper.Point(0, this.height / 2);
    const arrowVec = start.subtract(end);

    // parameterize {headLength: 20, tailLength: 6, headAngle: 35, tailAngle: 110}
    // construct the arrow
    const arrowHead = arrowVec.normalize(this.headLength);
    const arrowTail = arrowHead.normalize(this.tailLength);

    const p3 = end;                  // arrow point

    const p2 = end.add(arrowHead.rotate(-this.headAngle));   // leading arrow edge angle
    const p4 = end.add(arrowHead.rotate(this.headAngle));    // ditto, other side

    const p1 = p2.add(arrowTail.rotate(this.tailAngle));     // trailing arrow edge angle
    const p5 = p4.add(arrowTail.rotate(-this.tailAngle));    // ditto

    // specify all but the last segment, closed does that
    let path = sk.path([start, p1, p2, p3, p4, p5]);
    path.closed = true;
    sk.setPathTransform(path);
  }
}


export default Arrow;
