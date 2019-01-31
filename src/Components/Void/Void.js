import React, { Component } from 'react';
import Box from '../Box/Box';
import './Void.css';
import voidIcon from '../../Icons/void.svg';

/*Pencil*/
class Void extends Box {

  constructor(props) {
    super(props);
    this.className += " " + Void.className;
    this.unauthorized = ["*"];
  }

}

Void.className = "Void";
Void.icon = voidIcon;

export default Void;
