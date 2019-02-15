import React, { Component } from 'react';
import Placement from '../Placement';
import './Grid.css';
import 'rc-slider/assets/index.css';
import Canvas from '../../Canvas/Canvas';
import DragBox from '../../DragBox/DragBox';
import ContextMenuBox from '../../ContextMenuBox/ContextMenuBox';
import SliderBox from '../../Input/SliderBox/SliderBox';
import grid_on from '../../../Icons/grid_on.svg';

import LinearY from '../../Modes/GridMode/LinearY/LinearY';
import LinearX from '../../Modes/GridMode/LinearX/LinearX';
import DiagonalLeft from '../../Modes/GridMode/DiagonalLeft/DiagonalLeft';
import DiagonalRight from '../../Modes/GridMode/DiagonalRight/DiagonalRight';
import Orthogonal from '../../Modes/GridMode/Orthogonal/Orthogonal';
import SnailRight from '../../Modes/GridMode/SnailRight/SnailRight';

const menu = [{
  type: 'Modes',
  elements: [
    {type: 'DiagonalLeft'},
    {type: 'DiagonalRight'},
    {type: 'LinearX'},
    {type: 'LinearY'},
    {type: 'Orthogonal'},
    {type: 'SnailRight'}
  ]
}];

/*Pencil*/
class Grid extends Placement {

  constructor(props) {
    super(props);
    this.className += " " + Grid.className;
    //const {columns, rows} = this.props;
    this.suppMenu[this.suppMenu.length - 1].menu = menu;
  }

  initState() {
    super.initState();
    this.state.columns = 8;
    this.state.rows = 8;
    this.state.mode = LinearX;
  }

  draw(sk) {

    var column = sk.width/this.state.columns;
  	var row = sk.height/this.state.rows;
    var elem = this.next;
    var currentMode = this.state.currentMode;

  	if(!elem) sk.stroke(this.state.color.getP5Color(sk));

    if(currentMode) {
      currentMode.mode(sk, {
        columns: this.state.columns,
        rows: this.state.rows,
        lines: elem ? false : true,
        callback: function() {
          if(elem) {
            sk.noStroke();
            sk.push();
              sk.translate(column / 2, row / 2);
              sk.scale(column, row);
              sk.strokeWeight(1/column);
              elem.draw(sk);
              sk.strokeWeight(1);
            sk.pop();
          }
        }
      });
    }

  }


  renderBox() {
    return(
      <>
        <SliderBox
        min={1}
        max={50}
        defaultValue={this.state.columns}
        marks={{1: 1, 50: 50}}
        step={1}
        onChange={(value) => {this.setState({columns: value, rows: value});}}
        />
        {this.renderMode()}
      </>
    );
  }

}

Grid.className = "Grid";
Grid.icon = grid_on;

export default Grid;
