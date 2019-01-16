import React, { Component } from 'react';
import './Grid.css';
import Box from '../Box/Box';

/*Pencil*/
class Grid extends Box {

  constructor(props) {
    super(props);
    this.className += " " + this.constructor.name;
    const {x, y} = this.props;
    this.x = x;
    this.y = y;
  }

  draw(sk) {
    var columns = sk.floor(width/cells);
  	var rows = sk.floor(height/cells);

  	sk.background(0);
  	sk.stroke(255);
  	for(var i = 0; i <= columns; i++) {
  		for(var j = 0; j <= rows; j++) {
  			sk.line(i * cells, 0, i * cells, height);
  			sk.line(0, j * cells, width, j * cells);
  		}
  	}
  }

  render() {
    return (
      <div className={this.className}>
        <span>{this.constructor.name}</span>
      </div>
    );
  }
}

export default Rectangle;
