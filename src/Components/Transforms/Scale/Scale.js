import React from 'react';
import Transform from '../Transform';
import './Scale.css';
import scaleIcon from '../../../Icons/scale.svg';
import SliderBox from '../../Input/SliderBox/SliderBox';

/*Attribute*/
class Scale extends Transform {


  constructor(props) {
    super(props);
    this.className += " " + Scale.className;
    this.scale = {x: 1, y: 1};
  }

  render() {
    return (
      <SliderBox min={1} max={20} defaultValue={10} marks={{1:0.1, 10:1, 20:2}} step={1} onChange={(value) => {
        this.scale = {x: value / 10, y: value / 10};
        if(this.props.onChange) this.props.onChange(this.scale);
      }} />
    );
  }
}

Scale.className = "Scale";
Scale.icon = scaleIcon;

export default Scale;
