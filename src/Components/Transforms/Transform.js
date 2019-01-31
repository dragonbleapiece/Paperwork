import React, { Component } from 'react';
import Box from '../Box/Box';
import './Transform.css';
import p5 from 'p5';

/*Attribute*/
class Transform extends Component {

  constructor(props) {
    super(props);
    this.className = Transform.className;
  }
}

Transform.className = "Transform";
Transform.icon = undefined;

export default Transform;
