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
    this.className += " " + Markov.className;
    this.proba = [];
    this.elementsLength = this.state.children.length;
    this.currentState = parseInt(Math.random() * (this.elementsLength));
    this.idElement = [];
    this.id = 0;
  }

  setChildren(children) {
    super.setChildren(children);
    this.elementsLength = this.state.children.length;
    this.currentState = parseInt(Math.random() * (this.elementsLength));
  }

  draw(sk) {
    if(this.elementsLength === 0) return;
    let element = this.elements[this.currentState];
    if(this.elementsLength === 1) {
      element.draw(sk);
      return;
    }
    let proba = 0;
    let rand = parseInt(Math.random() * (100));
    let i;

    for(i = 0; i < this.elementsLength && rand >= proba; ++i) {
      proba = this.proba[this.currentState][i];
    }

    this.elements[i - 1].draw(sk);
    this.currentState = i - 1;
  }

  renderBox() {
    const length = this.state.children.length;
    let defaultValues = [];
    let sliders;

    for(let i = 1; i <= length - 1; ++i) {
      defaultValues.push((100 / length) * i);
    }

    if(length - 1 > 0) {
      let propsRange = {
        min: 0,
        max: 100,
        defaultValue: defaultValues,
        marks: {0:0, 100:1},
        step: 10,
        count: length - 1,
        pushable: 0,
        style: {width: 100, margin: 20},
        handleStyle: { borderColor: 'black'},
        trackStyle: { backgroundColor: 'black' },
        railStyle: { backgroundColor: 'black' },
        dotStyle: { borderColor: 'black' },
        activeHandleStyle: {borderColor: 'red'}
      };

      sliders = this.state.children.map((child, index) => {
          if(this.elementsLength !== length) {
            this.proba[index] = defaultValues;
            this.idElement[index] = this.id++
          }
          propsRange.key = this.idElement[index];
          propsRange.onChange = (value) => {this.proba[index] = value; Workspace.forceUpdate();}
          return React.createElement(Range, propsRange);
        }
      );
    }


    this.elementsLength = length;

    return(
      <>
        {sliders}
      </>
    );
  }

}

Markov.className = "Markov";

export default Markov;
