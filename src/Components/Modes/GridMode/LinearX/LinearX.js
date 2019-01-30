import React, { Component } from 'react';
import GridMode from '../GridMode';


/*Pencil*/
class LinearX extends GridMode {

  state = {
  };

  constructor(props) {
    super(props);
    this.className += " " + LinearX.className;
  }

  mode(sk, data) {
    const {rows, columns, callback} = data;

    var column = sk.width/columns;
    var row = sk.height/rows;

    for(var i = 0; i < rows; i++) {
      sk.push();
        sk.translate(0, row * i);
    		for(var j = 0; j < columns; j++) {
          sk.push();
            sk.translate(j * column, 0);
            if(callback) callback();
          sk.pop();
    		}
      sk.pop();
  	}
  }
}

LinearX.className = "LinearX";

export default LinearX;
