import React, { Component } from 'react';
import BoxGroup from '../BoxGroup/BoxGroup';
import 'rc-slider/assets/index.css';
import './Markov.css';
import Workspace from '../Workspace/Workspace';
import RangeBox from '../Input/RangeBox/RangeBox';
import shortid from 'shortid';

//import Icons
import SVG from 'react-svg';
import next from '../../Icons/next.svg';
import unknown from '../../Icons/unknown.svg';

function clamp_left(a, b) {
   return a < b ? b : a;
}

function clamp_right(a, b) {
   return a > b ? b : a;
}

function clamp(a, b, c) {
  return clamp_left(clamp_right(a, c), b);
}

function checkLeft(userValue, i, handle) {
  if (i < 0) return;
  if (userValue <= handle[i]) {
    handle[i] = userValue;
    checkLeft(userValue, --i, handle);
  }
}

function checkRight(userValue, i, handle) {
  if (i >= handle.length) return;
  if (userValue >= handle[i]) {
    handle[i] = userValue;
    checkRight(userValue, ++i, handle);
  }
}

/*Pencil*/
class Markov extends BoxGroup {

  constructor(props) {
    super(props);
    this.className += " " + Markov.className;
    this.suppMenu = [];
    this.state.proba = [];
    this.elementsLength = this.state.children.length;
    this.currentState = parseInt(Math.random() * (this.elementsLength));
    this.idElement = [];
    this.unauthorized.push("Placement");
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
      proba = this.state.proba[this.currentState][i];
    }

    this.elements[i - 1].draw(sk);
    this.currentState = i - 1;
  }

  renderBox() {
    const length = this.state.children.length;
    let defaultValues = [];
    let sliders;

    for(let i = 1; i <= length - 1; ++i) {
      if (i == length-1) defaultValues.push(Math.floor(100/length/10)*10*i+100%(length*10));
      else defaultValues.push(Math.floor(100/length/10)*10*i);
    }

    if(length - 1 > 0) {
      let propsRange = {
        min: 0,
        max: 100,
        defaultValue: defaultValues,
        marks: {0:0, 100:100},
        step: 5,
        count: length - 1,
        pushable: 0
      };

      sliders = this.state.children.map((child, index) => {
        let inputs = [], RangeIcon;

        RangeIcon = <span className="Markov__RangeIcon">
          <SVG src={child.type.icon}/>
          <SVG src={next}/>
          <SVG src={unknown}/>
        </span>;

          if(this.elementsLength !== length) {
            this.state.proba[index] = [...defaultValues]; //remove reference
            this.idElement[index] = shortid.generate();
            propsRange.innerRef = (el) => {if(el) this.state.proba[index] = el.state.bounds};
            propsRange.innerRef.bind(this);
          }
          propsRange.key = this.idElement[index];
          propsRange.onChange = (value) => {this.state.proba[index] = value; Workspace.forceUpdate();}

          for (let i = 0; i < length; i++) {
            let propsInput = {
              type: "number",
              key: this.idElement[index]+i,
              min: 0,
              max: 100,
              step: 5,
            };
            if (i == 0) {
              propsInput.value = this.state.proba[index][i];
              propsInput.onChange = (event) => {
                let proba = this.state.proba;
                let value = clamp(parseInt(event.target.value), propsInput.min, propsInput.max);
                checkLeft(value, i, proba[index]);
                checkRight(value, i, proba[index]);
                this.setState({proba:proba});
              };
            } else if (i == length-1) {
              propsInput.value = 100-this.state.proba[index][i-1];
              propsInput.onChange = (event) => {
                let proba = this.state.proba;
                let value = clamp(parseInt(event.target.value), propsInput.min, propsInput.max);
                checkLeft(100-value, i-1, proba[index]);
                checkRight(100-value, i-1, proba[index]);
                this.setState({proba:proba});
              };
            } else {
              propsInput.max = 100 - this.state.proba[index][i-1];
              propsInput.value = this.state.proba[index][i]-this.state.proba[index][i-1];
              propsInput.onChange = (event) => {
                let proba = this.state.proba;
                let value = clamp(parseInt(event.target.value), propsInput.min, propsInput.max);
                checkLeft(value+this.state.proba[index][i-1], i, proba[index]);
                checkRight(value+this.state.proba[index][i-1], i, proba[index]);
                this.setState({proba:proba});
              };
            }
            inputs.push(<div className="Markov__InputContainer">
              <span className="Markov__InputIcon">
                <SVG src={this.state.children[i].type.icon}/>
              </span>
              <input className="Markov__Input" {...propsInput}/>
            </div>);
          }

          return (

              <div className="Markov__Containers">
                <div className="Markov__RangeContainer">
                  {RangeIcon}
                  <RangeBox {...propsRange}/>
                </div>
                <div className="Markov__InputsContainer">
                  {inputs}
                </div>
              </div>
            );
        }
      );
    }


    this.elementsLength = length;

    return <div className="Markov__Parameters">{sliders}</div>;
  }

}

Markov.className = "Markov";
Markov.icon = undefined;

export default Markov;
