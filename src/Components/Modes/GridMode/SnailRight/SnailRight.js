import React, { Component } from 'react';
import GridMode from '../GridMode';


/*Pencil*/
class SnailRight extends GridMode {

  state = {
  };

  constructor(props) {
    super(props);
    this.className += " " + SnailRight.className;
  }

  mode(sk, data) {
    const {rows, columns, callback} = data;

    var column = sk.width/columns;
    var row = sk.height/rows;

    let a = Math.round(columns / 2) - 1;
    let b = Math.round(rows / 2) - 1;
    let side = 1;
    let move = -1;

    while (side <= columns) {
      move *= -1;
      for (let i = 0; i<side && a >= 0 && a < columns; i++) {
        sk.push();
          sk.translate(a * column, b * row);
          if(callback) callback();
        sk.pop();
        a += move;
      }
      if(a < 0 || a >= columns) break;

      for (let i = 0; i<side && b >= 0 && b < rows; i++) {
        console.log(a, b);
        sk.push();
          sk.translate(a * column, b * row);
          if(callback) callback();
        sk.pop();
        b += move;
      }
      side++;
    }

  }

}

SnailRight.className = "SnailRight";

export default SnailRight;
