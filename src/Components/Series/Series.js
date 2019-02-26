import React, { Component } from 'react';
import BoxGroup from '../BoxGroup/BoxGroup';
import './Series.css';
import shortid from 'shortid';

const className = "Series";
const unauthorized = ["Placement", "Series", "Markov"];

/*Pencil*/
class Series extends BoxGroup {

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
    this.className += " " + Series.className;
    this.suppMenu = [];
    this.currentState = 0;
  }

  setChildren(children) {
    console.log(this.state.children.length);
    super.setChildren(children);
    this.currentState = 0;
    console.log(this.state.children.length);
  }

  draw(sk) {
    if(this.elements.length === 0) return;

    if(this.elements[this.currentState]) this.elements[this.currentState].draw(sk);
    this.currentState = (this.currentState + 1) % this.elements.length;
  }

}

export default Series;
