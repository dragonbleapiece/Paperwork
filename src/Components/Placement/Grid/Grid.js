import React from 'react';
import Placement from '../Placement';
import './Grid.css';
import 'rc-slider/assets/index.css';
import SliderBox from '../../Input/SliderBox/SliderBox';
import grid_on from '../../../Icons/grid_on.svg';
import InBox from '../../InBox/InBox';
import Series from '../../Series/Series';

import LinearX from '../../Modes/GridMode/LinearX/LinearX';

const className = "Grid";
const unauthorized = [];
const doBeforeAddChild = {
  Figure: (child) => {
    return InBox(Series, child);
  },
  Recursion: (child) => {
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

  	if(!elem) sk.stroke(this.state.color.getColor(sk));

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
              elem.draw(sk);
            sk.pop();
          }
        }
      });
    }

  }


  getTransforms() {
    return(
      <div className="TransformBox2">
        <SliderBox
        min={1}
        max={30}
        defaultValue={this.state.columns}
        marks={{1: 1, 30: 30}}
        step={1}
        onChange={(value) => {this.setState({columns: value, rows: value});}}
        />
        {this.renderMode()}
      </div>
    );
  }

}

export default Grid;
