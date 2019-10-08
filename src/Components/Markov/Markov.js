import React from 'react';
import BoxGroup from '../BoxGroup/BoxGroup';
import 'rc-slider/assets/index.css';
import './Markov.css';
import RangeBox from '../Input/RangeBox/RangeBox';
import Radar from './Radar';
import shortid from 'shortid';

//import Icons
import SVG from 'react-svg';
import next from '../../Icons/next.svg';
import unknown from '../../Icons/unknown.svg';

const CENT = 100;
const ROUND = 10;

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

const className = "Markov";
const unauthorized = ["Placement"];

/*Pencil*/
class Markov extends BoxGroup {

  static get className() {
    return className;
  }

  static get icon() {
    return undefined;
  }

  static get unauthorized() {
    return [...super.unauthorized, ...unauthorized];
  }

  constructor(props) {
    super(props);
    this.className += " " + Markov.className;
    this.suppMenu = [];
    this.currentState = parseInt(Math.random() * (this.state.children.length));
    this.idElement = [];
  }

  initState() {
    super.initState();
    this.state.proba = this.initProba();
    this.state.index = 0;
  }

  initProba(length = this.state.children.length) {
    if(length <= 1) return [[CENT]];
    const defaultValue = Math.floor(CENT / ROUND / length) * ROUND;
    let proba = new Array(length).fill(new Array(length).fill(defaultValue));
    proba.forEach((_, index) => {
      proba[index][length - 1] = 100 - defaultValue * (length - 1);
    });
    return proba;
  }

  doBeforeSetChildren(children) {
    const result = super.doBeforeSetChildren(children);
    if(children.length !== this.state.children.length) {
      this.currentState = parseInt(Math.random() * (children.length));
      const newProba = this.initProba(children.length);
      return {...result, proba: newProba, index: 0};
    }
    return result;
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
    let rand = parseInt(Math.random() * (CENT));
    let i;

    for(i = 0; i < length && rand >= proba; ++i) {
      proba += this.state.proba[this.currentState][i];
    }

    if(this.elements[i - 1]) this.elements[i - 1].draw(sk);
    this.currentState = i - 1;
  }

  getProbas(index) {
    if(index < 0 || index >= this.state.children.length) {
      return [];
    }

    return [...this.state.proba[index]];
  }

  checkProba(proba, probaIndex) {
    const length = this.state.children.length;
    const index = this.state.index;
    let newProba = [...this.state.proba];
    newProba[index] = Array.from(this.state.proba[index]);
    newProba[index][probaIndex] = proba;
    const sum = newProba[index].reduce((acc, p) => acc + p, 0);
    let remaining = sum - 100;
    let i = (probaIndex + 1) % length;
    while(i !== probaIndex && Math.abs(remaining) > 0) {
      const p = newProba[index][i];
      let r = clamp(p - remaining, 0, 100);
      newProba[index][i] = r;
      remaining -= p - r;
      i = (i + 1) % length;
    }
    this.setState({proba: newProba});
    window.updateWorkspace();
  }

  renderBox() {
    let sliders;
    let radar = null;
    const index = this.state.index;
    const length = this.state.children.length;
    let header = null;
    let inputs = [];

    if(length > 1 && this.state.proba.length > 1) {

        for(let i = 0; i < length; ++i) {
          const angle = i * 2 * Math.PI / length - Math.PI / 2;
          const x = 50 + 40 * Math.cos(angle);
          const y = 50 + 40 * Math.sin(angle);
          const iconSelected = (i === index) ? ' selected' : '';
          inputs.push(<div className="Markov__InputContainer" key={i} style={{left: x + '%', top: y + '%'}}>
            <span className={"Markov__InputIcon" + iconSelected}>
              <SVG src={this.state.children[i].type.icon} onClick={() => {this.setState({index: i})}}/>
            </span>
            <input className="Markov__Input"
              min={0}
              max={100}
              type='number'
              value={this.state.proba[index][i]}
              onChange={(e) => {
                const target = e.target;
                const intValue = parseInt(target.value, 10);
                const value = Number.isInteger(intValue) ? intValue : 0;
                if(target.min > value || target.max < value) return;
                this.checkProba(value, i);
              }}
            />
          </div>);
        }

        radar = <Radar points={this.getProbas(index)} callback={this.checkProba.bind(this)} />;


        header = <span className="Markov__RangeIcon">
          <SVG src={this.state.children[index].type.icon}/>
          <SVG src={next}/>
          <SVG src={unknown}/>
        </span>

      }

    return <div className="Markov__Parameters">
      {header}
      {radar}
      {inputs}
    </div>;
  }

}

export default Markov;
