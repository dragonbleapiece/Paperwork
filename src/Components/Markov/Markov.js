import React, { Component } from 'react';
import BoxGroup from '../BoxGroup/BoxGroup';
import Input from '../Input/Input';
import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';
import './Markov.css';
import Workspace from '../Workspace/Workspace';

/*Pencil*/
class Markov extends BoxGroup {

  constructor(props) {
    super(props);
    this.className += " " + Markov.name;
    this.proba = [];
  }

  addProba(array) {
    if(array instanceof Array) {
      this.proba.push(array);
    }
  }

  draw(sk) {
    let proba = 0;
    let rand = sk.random(100);
    /*for(let i = 0; i < this.elements.length; ++i) {
      let element = this.elements[i];
      proba += element.value;
      if(rand <= proba) {
        element.draw(sk);
        break;
      }
    }*/
  }

  renderBox() {
    const length = this.state.children.length;
    let defaultValues = [];
    let sliders;

    console.log(length);

    for(let i = 0; i < length; ++i) {
      defaultValues.push((100 / length) * i);
    }

    if(length - 1 > 0) {
      sliders = this.state.children.map((child, index) =>
          <Range
          min={0}
          max={100}
          defaultValue={defaultValues}
          marks={{0: 0, 100: 100}}
          step={1}
          count={length - 1}
          allowCross={false}
          style={{ width: 100, margin: 20}}
          handleStyle={{ borderColor: 'black'}}
          trackStyle={{ backgroundColor: 'black' }}
          railStyle={{ backgroundColor: 'black' }}
          dotStyle={{ borderColor: 'black' }}
          activeHandleStyle={{borderColor: 'red'}}
          onChange={(value) => {Workspace.forceUpdate();}}
          key={index}
          />
      );
    }

    return(
      <>
        {sliders}
      </>
    );
  }

}

export default Markov;
