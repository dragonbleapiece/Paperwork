import React, { Component } from 'react';
import BoxGroup from '../BoxGroup/BoxGroup';
import Input from '../Input/Input';
import './Markov.css';
import p5 from 'p5';

/*Pencil*/
class Markov extends BoxGroup {

  constructor(props) {
    super(props);
    this.className += " " + Markov.name;
  }

  /*addElement(elmnt, proba) {
    super.addElement(elmnt);
    this.proba.push(parseFloat(proba));
  }*/

  draw(sk) {
    let proba = 0;
    let rand = sk.random(100);
    for(let i = 0; i < this.elements.length; ++i) {
      let element = this.elements[i];
      proba += element.value;
      if(rand <= proba) {
        element.draw(sk);
        break;
      }
    }
  }

  render() {
    return (
      <div className={this.className}>
        <span>{this.constructor.name}</span>
        {this.initElements(Input)}
      </div>
    );
  }
}

export default Markov;
