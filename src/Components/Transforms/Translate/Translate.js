import React, { Component } from 'react';
import Transform from '../Transform';
import './Translate.css';

/*Pencil*/
class Translate extends Transform {

  constructor(props) {
    super(props);
    this.className += " " + Translate.name;
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

export default Translate;
