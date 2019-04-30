import React from 'react';
import Placement from '../Placement';
import './Grid.css';
import 'rc-slider/assets/index.css';
import SliderBox from '../../Input/SliderBox/SliderBox';
import grid_on from '../../../Icons/grid_on.svg';
import InBox from '../../InBox/InBox';
import Series from '../../Series/Series';

import LinearX from '../../Modes/GridMode/LinearX/LinearX';


const menu = [{
  type: 'Modes',
  elements: [
    {
      type: 'DiagonalLeft',
      name: 'Diagonal Left'
    },
    {
      type: 'DiagonalRight',
      name: 'Diagonal Right'
    },
    {
      type: 'LinearX',
      name: 'Linear X'
    },
    {
      type: 'LinearY',
      name: 'Linear Y'
    },
    {
      type: 'Orthogonal'
    },
    {
      type: 'SnailRight',
      name: 'Snail Right'
    }
  ]
}];

const className = "Grid";
const unauthorized = ["Placement"];
const doBeforeAddChild = {
  Figure: (child) => {
    return InBox(Series, child);
  }
}

/*Pencil*/
class Grid extends Placement {

  static get className() {
    return className;
  }

  static get icon() {
    return grid_on;
  }

  static get unauthorized() {
    return [...super.unauthorized, ...unauthorized];
  }

  constructor(props) {
    super(props);
    this.className += " " + Grid.className;
    this.doBeforeAddChild = doBeforeAddChild;
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

export default Grid;
