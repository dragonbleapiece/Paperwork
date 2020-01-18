import React from 'react';
import Transform from '../Transform';
import './Scale.css';
import scaleIcon from '../../../Icons/scale.svg';
import SliderBox from '../../Input/SliderBox/SliderBox';

/*Attribute*/
class Scale extends Transform {


  constructor(props) {
    super(props);
    this.state.input = SliderBox;
    this.className += " " + Scale.className;
    this.defaultValue = this.props.defaultValue || 1;
  }

  getInputValue() {
    const value = this.inputElement.getValue();
    console.log(value);
    return {x: value / 10, y: value / 10};
  }

  renderTransform() {
    return (
      <this.state.input ref={(el) => this.inputElement = el}  onChange={(value, el) => {
        this.inputElement = el;
      }} />
    );
  }
}

Scale.className = "Scale";
Scale.icon = scaleIcon;

export default Scale;
