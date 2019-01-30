import React, { Component } from 'react';
import './GridMode.css';
import Mode from "../Mode";


/*Pencil*/
class GridMode extends Mode {

  state = {
  };

  constructor(props) {
    super(props);
    this.className += " " + GridMode.className;
  }

  mode(sk, data) {

  }

}

GridMode.className = "GridMode";

export default GridMode;
