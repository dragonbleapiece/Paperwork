import React, { Component } from 'react';
import './Symbol.css';
import Figure from '../Figure';

const className = "Symbol";
const unauthorized = [];

/*Pencil*/
class Symbol extends Figure {

  static get className() {
    return className;
  }

  static get icon() {
    return undefined;
  }

  static get unauthorized() {
    return [...super.unauthorized, ...unauthorized];
  }

  constructor(props) {
    super(props);
    this.className += " " + Symbol.className;
  }
}


export default Symbol;
