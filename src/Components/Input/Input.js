import React, { Component } from 'react';
import Box from '../Box/Box';
import './Input.css';
import p5 from 'p5';

/*Pencil*/
class Input extends Box {

  constructor(props) {
    super(props);
    this.className += " " + Input.name;
    this.value = 0;
  }

  draw(sk) {
    if(this.next !== undefined) {
      this.next.draw(sk);
    }
  }

  render() {
    const {min, max, value} = this.props;

    return (
      <div className={this.className}>
        <input type="range" min={min} max={max} value={value} class="slider" />
      </div>
    );
  }
}

export default Input;
