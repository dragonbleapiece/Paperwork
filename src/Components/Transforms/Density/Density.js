import React from 'react';
import Transform from '../Transform';
import './Density.css';
//import densityIcon from '../../../Icons/scale.svg';
import SliderBox from '../../Input/SliderBox/SliderBox';

/*Attribute*/
class Density extends Transform {


  constructor(props) {
    super(props);
    this.state.input = SliderBox;
    this.className += " " + Density.className;
    this.value = 11;
  }

  renderTransform() {
    return (
      <this.state.input min={2} max={20} defaultValue={11} marks={{2:1, 11:10, 20:19}} step={1} onChange={(value) => {
        this.value = value;
        if(this.props.onChange) this.props.onChange(this.value);
      }} />
    );
  }
}

Density.className = "Density";
//Density.icon = densityIcon;

export default Density;
