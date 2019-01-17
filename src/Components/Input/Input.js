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
    this.parent = function() {};
  }

  draw(sk) {
    if(this.next !== undefined) {
      this.next.draw(sk);
    }
  }

  onChange() {
    this.callParent();
  }

  callParent() {
    this.parent();
  }

  render() {
    const {min, max, value} = this.props;

    return (
      <div className={this.className}>
        <input type="range" min={min} max={max} value={value} onChange={this.onChange} class="slider" />
      </div>
    );
  }
}

export default Input;
