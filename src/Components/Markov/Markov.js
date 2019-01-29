import React, { Component } from 'react';
import BoxGroup from '../BoxGroup/BoxGroup';
import 'rc-slider/assets/index.css';
import './Markov.css';
import Workspace from '../Workspace/Workspace';
import RangeBox from '../Input/RangeBox/RangeBox';
import shortid from 'shortid';

/*Pencil*/
class Markov extends BoxGroup {

  constructor(props) {
    super(props);
    this.className += " " + Markov.className;
    this.proba = [];
    this.elementsLength = this.state.children.length;
    this.currentState = parseInt(Math.random() * (this.elementsLength));
    this.idElement = [];
  }

  setChildren(children) {
    super.setChildren(children);
    this.currentState = parseInt(Math.random() * (this.elementsLength));
  }

  draw(sk) {
    let length = this.state.children.length;
    if(length === 0) return;
    let element = this.elements[this.currentState];
    if(length === 1) {
      if(element) element.draw(sk);
      return;
    }
    let proba = 0;
    let rand = parseInt(Math.random() * (100));
    let i;

    for(i = 0; i < length && rand >= proba; ++i) {
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
        pushable: 0
      };

      sliders = this.state.children.map((child, index) => {
          if(this.elementsLength !== length) {
            this.proba[index] = defaultValues;
            this.idElement[index] = shortid.generate();
          }
          propsRange.key = this.idElement[index];
          propsRange.onChange = (value) => {this.proba[index] = value; Workspace.forceUpdate();}
          return <RangeBox {...propsRange}/>;
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
Markov.icon = undefined;

export default Markov;
