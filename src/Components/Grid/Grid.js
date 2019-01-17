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
  	for(var i = 0; i < this.columns; i++) {
      sk.line(0, 0, 0, sk.height);
  		for(var j = 0; j < this.rows; j++) {
        sk.line(0, 0, sk.width, 0);
        if(elem !== undefined) {

          /*elem.x = i * column + x;
          elem.y = j * row + y;*/
          elem.draw(sk);
        }
        sk.translate(0, row);
  		}
      sk.translate(column, 0);
      sk.translate(0, -sk.height);
  	}
    sk.translate(-sk.width, 0);

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
