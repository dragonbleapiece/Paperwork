import React, { Component } from 'react';
import './Grid.css';
import Box from '../Box/Box';

/*Pencil*/
class Grid extends Box {

  constructor(props) {
    super(props);
    this.className += " " + Grid.name;
    const {columns, rows} = this.props;
    this.columns = columns;
    this.rows = rows;
  }

  draw(sk) {

    var column = sk.width/this.columns;
  	var row = sk.height/this.rows;
    var elem = this.next;
    if(elem !== undefined) {
      var x = elem.x;
      var y = elem.y;
    }

  	sk.background(0);
  	sk.stroke(255);
  	for(var i = 0; i <= this.columns; i++) {
  		for(var j = 0; j <= this.rows; j++) {
  			sk.line(i * column, 0, i * column, sk.height);
  			sk.line(0, j * row, sk.width, j * row);
        if(elem !== undefined) {
          elem.x = i * column + x;
          elem.y = j * row + y;
          elem.draw(sk);
        }
  		}
  	}

    if(elem !== undefined) {
      elem.x = x;
      elem.y = y;
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

export default Grid;
