import React, { Component } from 'react';
import './Canvas.css';
import PropTypes from 'prop-types';

var p5 = require('p5');
require('p5.js-svg')(p5);

class Canvas extends Component {

  /*Singleton*/
  static _instance;
  static _P5;
  static savePaper(filename, extension) {
    if(Canvas._P5 !== undefined) {
      Canvas._P5.savePaper(filename, extension);
    }
  }


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

  setfilename(filename, ext = undefined) {
    this.filename = filename;
    if(ext !== undefined) this.extension = ext;
  }

  CalcCanvasSize() {
    let canvasWidth = window.innerWidth*0.5-60;
    let canvasHeight = window.innerHeight-180;
    let CanvasSize = (canvasWidth < canvasHeight) ? canvasWidth : canvasHeight;
    this.setState({width: CanvasSize, height: CanvasSize});
  }

  initP5() {
    let self = this;
    let s = (sk) => {
      sk.setup = self.setup.bind(self, sk);
      sk.draw = self.draw.bind(self, sk);
      sk.windowResized = self.windowResized.bind(self, sk);
      sk.savePaper = self.savePaper.bind(self, sk);

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

  savePaper(sk, filename, extension) {
    if(filename !== undefined || extension !== undefined) {
      sk.saveCanvas(filename, extension);
    }
  }

  setup(sk) {
    const {width, height} = this.state;
    sk.createCanvas(width, height, sk.SVG);
    sk.noLoop();
  }

  draw(sk) {
    let f = this.state.function;
    if(f !== undefined) {
      f(sk);
    }
  }

  componentDidMount() {
    this.CalcCanvasSize();
    this.initP5();
  }

  componentDidUpdate() {
    Canvas._P5.draw();
  }


  render() {
    return (
      <div className="canvasContainer">
        <div id="renderer">
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
