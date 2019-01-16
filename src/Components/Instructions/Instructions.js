import React, { Component } from 'react';
import './Instructions.css';
import Canvas from '../Canvas/Canvas';

class Instructions extends Component {

  constructor(props) {
    super(props);


  }



  render() {
    let canvas = new Canvas();

    for(let child in this.props.children) {
      canvas.addDraw(child.draw.bind(child));
    }

    return (
      <div className={this.className}>
      {this.props.children}
      </div>
    );
  }
}

export default Instructions;
