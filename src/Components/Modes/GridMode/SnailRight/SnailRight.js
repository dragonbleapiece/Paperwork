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

    let a = parseInt(columns / 2);
    let b = parseInt(rows / 2);
    let side = 0;
    let move = 1;

    sk.push();
      sk.translate(a * column, b * row);
      if(callback) callback();
    sk.pop();

    while (side <= columns/2) {
      move *= -1;
      for (let i = 0; i<side; i++) {
        a += move;
        sk.push();
          sk.translate(a * column, b * row);
          if(callback) callback();
        sk.pop();
      }
      for (let i = 0; i<side; i++) {
        b += move;
        sk.push();
          sk.translate(a * column, b * row);
          if(callback) callback();
        sk.pop();
      }
      side++;
    }

  }

}

SnailRight.className = "SnailRight";

export default SnailRight;
