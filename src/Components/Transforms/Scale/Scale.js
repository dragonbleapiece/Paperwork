import React, { Component } from 'react';
import Transform from '../Transform';
import './Scale.css';
import scaleIcon from '../../../Icons/scale.svg';
import SliderBox from '../../Input/SliderBox/SliderBox';

/*Attribute*/
class Scale extends Transform {


  constructor(props) {
    super(props);
    this.className += " " + Scale.className;
    this.state.scale = {x: 1, y: 1};
  }

  /*draw(sk) {
    sk.push();
      sk.scale(this.scaleX, this.scaleY);
      let max = Math.max(this.scaleX, this.scaleY);
      sk.strokeWeight(1/max);
      if(this.next) {
        this.next.draw(sk);
      }
      sk.strokeWeight(1);
    sk.pop();
  }*/

  render() {
    return (
      <SliderBox min={1} max={50} defaultValue={10} marks={{1:0.1, 50:5}} step={1} onChange={(value) => {
        this.setState({
          scale: {x: value / 10, y: value / 10}
        });
        if(this.props.onChange) this.props.onChange(this.state.scale);
      }} />
    );
  }
}

Scale.className = "Scale";
Scale.icon = scaleIcon;

export default Scale;
