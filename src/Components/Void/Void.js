import React, { Component } from 'react';
import Box from '../Box/Box';
import './Void.css';

/*Pencil*/
class Void extends Box {

  constructor(props) {
    super(props);
    this.className += " " + Void.className;
    this.unauthorized = ["*"];
  }

}

Void.className = "Void";
Void.icon = undefined;

export default Void;
