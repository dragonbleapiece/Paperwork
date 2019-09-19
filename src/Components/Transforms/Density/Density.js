import React from 'react';
import Transform from '../Transform';
import './Density.css';
//import densityIcon from '../../../Icons/scale.svg';
import SliderBox from '../../Input/SliderBox/SliderBox';

/*Attribute*/
class Density extends Transform {


  constructor(props) {
    super(props);
    this.className += " " + Density.className;
    this.density = 11;
  }

  render() {
    return (
      <SliderBox min={2} max={20} defaultValue={11} marks={{2:1, 11:10, 20:19}} step={1} onChange={(value) => {
        this.density = value;
        if(this.props.onChange) this.props.onChange(this.density);
      }} />
    );
  }
}

Density.className = "Density";
//Density.icon = densityIcon;

export default Density;
