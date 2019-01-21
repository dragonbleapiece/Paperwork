import React, { Component } from 'react';
import './Canvas.css';
import PropTypes from 'prop-types';

var p5 = require('p5');
require('p5.js-svg')(p5);

class Canvas extends Component {

  /*Singleton*/
  static _instance;
  static _P5;

  state = {
    function: undefined,
    width: 0,
    height: 0
  };

  constructor(props) {
    if(Canvas._instance != undefined) {
      return Canvas._instance;
    }
    super(props);

    Canvas._instance = this;
  }

  CalcCanvasSize() {
    let canvasWidth = window.innerWidth*0.5-60;
    let canvasHeight = window.innerHeight-180;
    let CanvasSize = (canvasWidth < canvasHeight) ? canvasWidth : canvasHeight;
    this.setState({width: CanvasSize, height: CanvasSize}, () => {console.log("width", this.state.width)});
  }

  initP5() {
    let self = this;
    let s = (sk) => {
      sk.setup = self.setup.bind(self, sk);
      sk.draw = self.draw.bind(self, sk);
      sk.windowResized = self.windowResized.bind(self, sk);
    }

    Canvas._P5 = new p5(s, 'renderer');
  }

  sendDraw(f) {
    this.setState({
      function: f
    });
  }

  resetDraw() {
    this.setState({
      function: undefined
    });
  }

  windowResized(sk) {
    this.CalcCanvasSize();
    sk.resizeCanvas(this.state.width, this.state.height);
  }

  setup(sk) {
    const {width, height} = this.state;
    sk.createCanvas(width, height);
    sk.noLoop();
  }

  draw(sk) {
    let f = this.state.function;
    if(f !== undefined) {
      f(sk);
    }
  }


  componentDidMount() {
    this.initP5();
    this.CalcCanvasSize();
  }


  render() {
    return (
      <div className="CanvasContainer">
        <div id="renderer">
        </div>
        <div id="svg">
        </div>
      </div>
    );
  }
}

Canvas._instance = undefined;
Canvas._P5 = undefined;

/*PropTypes*/
Canvas.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  cells: PropTypes.number
}

export default Canvas;
