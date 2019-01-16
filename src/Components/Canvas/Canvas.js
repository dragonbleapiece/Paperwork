import React, { Component } from 'react';
import p5 from 'p5';
import './Canvas.css';
import PropTypes from 'prop-types';


class Canvas extends Component {

  /*Singleton*/
  static _instance;
  static _P5;

  state = {
    functions: []
  };

  constructor(props) {
    if(Canvas._instance != undefined) {
      return Canvas._instance;
    }
    super(props);

    Canvas._instance = this;
  }

  addDraw(f) {
    this.setState({
      functions: [this.state.functions, f]
    });
  }

  resetDraw() {
    this.setState({
      functions: []
    });
  }

  setup(sk) {

    const {width, height, cells} = this.props;

    sk.createCanvas(width, height);
  }

  draw(sk) {
    for(let f in this.state.functions) {
      f(sk);
    }
  }


  componentDidMount() {
    let s = (sk) => {
      sk.setup = () => {
        if(Canvas._instance != undefined) {
          Canvas._instance.setup(sk);
        }
      }

      sk.draw = () => {
        if(Canvas._instance != undefined) {
          Canvas._instance.draw(sk);
        }
      }
    }

    Canvas._P5 = new p5(s, 'renderer');
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
