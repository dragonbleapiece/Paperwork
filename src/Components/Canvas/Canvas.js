import React, { Component } from 'react';
import p5 from 'p5';
import './Canvas.css';
import PropTypes from 'prop-types';


class Canvas extends Component {

  /*Singleton*/
  static _instance;
  static _P5;

  state = {
    function: undefined
  };

  constructor(props) {
    if(Canvas._instance != undefined) {
      return Canvas._instance;
    }
    super(props);
    this.initP5();
    Canvas._instance = this;
  }

  initP5() {
    let self = this;
    let s = (sk) => {
      sk.setup = self.setup.bind(self, sk);
      sk.draw = self.draw.bind(self, sk);
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

  setup(sk) {
    const {width, height, cells} = this.props;
    sk.createCanvas(width, height);
  }

  draw(sk) {
    let f = this.state.function;
    if(f !== undefined) {
      f(sk);
    }
  }


  componentDidMount() {

  }


  render() {
    return (
      <div id="renderer">

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
