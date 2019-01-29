import React, { Component } from 'react';
import Transform from '../Transform';
import './Translate.css';
import translate from '../../../Icons/translate.svg';

/*Pencil*/
class Translate extends Transform {

  constructor(props) {
    super(props);
    this.className += " " + Translate.className;
    this.destX = 10;
    this.destY = 10;
  }

  draw(sk) {
    sk.push();
      sk.translate(this.destX, this.destY);
      if(this.next) {
        this.next.draw(sk);
      }
    sk.pop();
  }
}

Translate.className = "Translate";
Translate.icon = translate;


export default Translate;
