import React, { Component } from 'react';
import Box from '../Box/Box';
import './Distribution.css';
import p5 from 'p5';

/*Pencil*/
class Distribution extends Box {

  constructor(props) {
    super(props);
    this.className += " " + Distribution.name;
  }

  draw(sk) {

  }
}

export default Distribution;
