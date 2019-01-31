import React, { Component } from 'react';
import Transform from '../Transform';
import './Translate.css';
import translate from '../../../Icons/translate.svg';

/*Attribute*/
class Translate extends Transform {

  constructor(props) {
    super(props);
    this.className += " " + Translate.className;
    this.destX = 10;
    this.destY = 10;
  }
}

Translate.className = "Translate";
Translate.icon = translate;


export default Translate;
