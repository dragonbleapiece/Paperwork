import React, { Component } from 'react';
import Box from '../Box/Box';
import './Placement.css';
import p5 from 'p5';

/*Pencil*/
class Placement extends Box {

  constructor(props) {
    super(props);
    this.className += " " + Placement.className;
  }

  draw(sk) {

  }
}

Placement.className = "Placement";
Placement.icon = undefined;

export default Placement;
