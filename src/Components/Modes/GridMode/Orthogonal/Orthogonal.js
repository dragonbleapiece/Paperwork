import React, { Component } from 'react';
import GridMode from '../GridMode';


/*Pencil*/
class Orthogonal extends GridMode {

  state = {
  };

  constructor(props) {
    super(props);
    this.className += " " + Orthogonal.className;
  }

  mode(sk, data) {
    const {rows, columns, callback} = data;

    var column = sk.width/columns;
    var row = sk.height/rows;

    for (var compteur = 0; compteur <= columns; compteur++) {
      let i, j;
      for (i = 0; i <= compteur; i++){
        sk.push();
          sk.translate(i * column, compteur * row);
          if(callback) callback();
        sk.pop();
      }
      for (j = compteur - 1; j >= 0; j--){
        sk.push();
          sk.translate(column * compteur, j * row);
          if(callback) callback();
        sk.pop();
      }
    }

  }

}

Orthogonal.className = "Orthogonal";

export default Orthogonal;
