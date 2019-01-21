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

  	sk.background(0);
  	sk.stroke(255);
  	for(var i = 0; i < this.columns; i++) {
      sk.push();
        sk.translate(column * i, 0);
        sk.line(0, 0, 0, sk.height);
    		for(var j = 0; j < this.rows; j++) {
          sk.push();
            sk.translate(0, j * row);
            sk.line(0, 0, sk.width, 0);
            if(elem !== undefined) {
              sk.noStroke();
              if(elem.next !== undefined)
                sk.translate(column / 2 - elem.next.width / 2, row / 2 - elem.next.height / 2);
              /*elem.x = i * column + x;
              elem.y = j * row + y;*/
              elem.draw(sk);
              if(elem.next !== undefined)
                sk.translate(-(column / 2 - elem.next.width / 2), -(row / 2 - elem.next.height / 2));
            }
          sk.pop();
    		}
      sk.pop();
  	}

  }

}

export default Grid;
