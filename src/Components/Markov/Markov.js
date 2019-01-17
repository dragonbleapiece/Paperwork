import React, { Component } from 'react';
import BoxGroup from '../BoxGroup/BoxGroup';
import './Markov.css';
import p5 from 'p5';

/*Pencil*/
class Markov extends BoxGroup {

  constructor(props) {
    super(props);
    this.className += " " + Markov.name;
    this.proba = new Array(this.elements.length);
  }

  /*addElement(elmnt, proba) {
    super.addElement(elmnt);
    this.proba.push(parseFloat(proba));
  }*/

  draw(sk) {
    let proba = 0;
    let rand = sk.random(100);
    for(let i = 0; i < this.elements.length; ++i) {
      proba += 100 / this.elements.length; //this.proba[i];
      if(rand <= proba) {
        this.elements[i].draw(sk);
      }
    }
  }

  render() {
    return (
      <div className={this.className}>
        <span>{this.constructor.name}</span>
        {this.initElements()}
      </div>
    );
  }
}

export default Markov;
