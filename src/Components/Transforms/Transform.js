import React, { Component } from 'react';
import Box from '../Box/Box';
import './Transform.css';
import p5 from 'p5';

/*Pencil*/
class Transform extends Box {

  constructor(props) {
    super(props);
    this.className += " " + Transform.className;
  }

  draw(sk) {

  }
}

Transform.className = "Transform";

export default Transform;
