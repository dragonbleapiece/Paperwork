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

// function clamp_left(a, b) {
//   return a < b ? b : a;
// }

// function clamp_right(a, b) {
//   return a > b ? b : a;
// }

// function clamp(a, b) {
//   return clamp_right(a, clamp_left(a, b));
// }

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
    // this.state.proba = [];
    this.state.proba = [];
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
      element.draw(sk);
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
        marks: {0:0, 100:1},
        step: 10,
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
            this.state.proba[index] = defaultValues;
            this.idElement[index] = shortid.generate();
          }
          propsRange.key = this.idElement[index];
          propsRange.onChange = (value) => {this.state.proba[index] = value; Workspace.forceUpdate();}
          

          for (let i = 0; i < length; i++) {
            if (i == 0) {
              inputs.push(<input key={shortid.generate()} type="number" min={0} max={100} step={10} value={ this.state.proba[index][i] } onChange={(event) => {
                let proba = this.state.proba;
                checkRight(event.target.value, i, proba[index]);
                this.setState({proba:proba});
              }
            }/>);  
            } else if (i == length-1) {
              inputs.push(<input key={shortid.generate()} type="number" min={0} max={100} step={10} value={ 100-this.state.proba[index][i-1] } onChange={(event) => {
                let proba = this.state.proba;
                checkLeft(100-event.target.value, i-1, proba[index]);
                this.setState({proba:proba});
                }
              }/>);
            } else {
              inputs.push(<input key={shortid.generate()} type="number" min={0} max={100} step={10} value={ this.state.proba[index][i]-this.state.proba[index][i-1] } onChange={(event) => {
                let proba = this.state.proba;
                checkLeft(parseInt(event.target.value)+this.state.proba[index][i-1], i, proba[index]);
                checkRight(parseInt(event.target.value)+this.state.proba[index][i-1], i, proba[index]);
                this.setState({proba:proba});
              }
            }/>);
            }
          }

          // for (let i = 0; i < length; i++) {
          //   if (i == 0) {
          //     inputs.push(<input key={shortid.generate()} type="number" min={0} max={100} step={10} value={this.state.proba[index][i]} onChange={(event) => {
          //       let proba = this.state.proba;
          //       proba[index][i] = event.target.value;
          //       this.setState({proba:proba});
          //     }
          //     }/>);
          //   } else if (i == length-1) {
          //     inputs.push(<input key={shortid.generate()} type="number" min={0} max={100} step={10} value={ 100-this.state.proba[index][i-1] } onChange={(event) => {
          //       let proba = this.state.proba;
          //       proba[index][i-1] = 100-this.state.proba[index][i-1] >= 0 && 100-event.target.value;
          //       this.setState({proba:proba});
          //     }
          //     }/>);
          //   } else {
          //     inputs.push(<input key={shortid.generate()} type="number" min={0} max={100} step={10} value={ this.state.proba[index][i]-this.state.proba[index][i-1] } onChange={(event) => {
          //       let proba = this.state.proba;
          //       proba[index][i-1] = this.state.proba[index][i]-this.state.proba[index][i-1] >= 0 && this.state.proba[index][i]-event.target.value;
          //       this.setState({proba:proba});
          //     }
          //     }/>);
          //   }
          // }
          return (
            <>
            <div className="Markov__Containers">
                <div className="Markov__RangeContainer">
                  {RangeIcon}
                  <RangeBox {...propsRange}/>
                </div>
                <div className="Markov__InputsContainer">
                  {inputs}
                </div>
              </div>
            </>
            );
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
