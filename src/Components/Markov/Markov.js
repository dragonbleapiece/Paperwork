import React from 'react';
import BoxGroup from '../BoxGroup/BoxGroup';
import BoxInputNumber from '../BoxInputNumber/BoxInputNumber';
import './Markov.css';
import markovIcon from '../../Icons/markov.svg';
import Radar from './Radar';
import * as Utils from '../../Utils';

//import Icons
import SVG from 'react-svg';
import next from '../../Icons/next.svg';
import unknown from '../../Icons/unknown.svg';

const CENT = 100;
const ROUND = 10;

const className = "Markov";
const unauthorized = ["Placement"];

/*Pencil*/
class Markov extends BoxGroup {

  static get className() {
    return className;
  }

  static get icon() {
    return markovIcon;
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
    this.hasInfo = true;
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

    this.currentState = parseInt(Math.random() * (children.length));
    const newProba = this.initProba(children.length);
    this.setState({proba: newProba});
    return {...result, proba: newProba, index: 0};
  }

  getColorMenu() {
    return [];
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
      let r = Utils.clamp(p - remaining, 0, 100);
      newProba[index][i] = r;
      remaining -= p - r;
      i = (i + 1) % length;
    }
    this.setState({proba: newProba});
  }

  getInfo() {
    return(
      <>
        <p>A Markov chain is a stochastic model describing a sequence of possible events in which the probability of each event depends only on the state attained in the previous event.</p>
        <p>For instance, a state <strong>A</strong> can have a probability <em>p</em> to reach a state <strong>B</strong> and a probability <em>(1 - p)</em> to reach itself</p>
      </>
    );
  }

  renderBox() {
    let radar = null;
    const index = this.state.index;
    const length = this.state.children.length;
    let header = null;
    let info = null;
    let inputs = [];

    if(length > 1 && this.state.proba.length > 1) {

        for(let i = 0; i < length; ++i) {
          const angle = i * 2 * Math.PI / length - Math.PI / 2;
          const x = 50 + 40 * Math.cos(angle);
          const y = 50 + 40 * Math.sin(angle);
          const iconSelected = (i === index) ? ' selected' : '';
          inputs.push(<div className="Markov__InputContainer" key={i} style={{left: x + '%', top: y + '%'}}>
            <span className={"Markov__InputIcon" + iconSelected}>
              {iconSelected && <SVG src={next} className="exponent" />}
              <SVG src={this.state.children[i].type.icon} onClick={() => {this.setState({index: i})}}/>
            </span>
            <BoxInputNumber className="Markov__Input"
              min={0}
              max={100}
              value={this.state.proba[index][i]}
              onChange={(value) => {
                const intValue = parseInt(value, 10);
                this.checkProba(intValue, i);
                window.updateWorkspace();
              }}
            />
          </div>);
        }

        radar = <Radar points={this.getProbas(index)} onChange={this.checkProba.bind(this)} onAfterChange={() => window.updateWorkspace()} />;


        header = <span className="Markov__RangeIcon">
          <SVG src={this.state.children[index].type.icon}/>
          <SVG src={next}/>
          <SVG src={unknown}/>
        </span>;

        info = <span className="Markov__Info">sum = 100%</span>;
      } else {
        info = <span>Not enough elements</span>;
      }

    return <div className="Markov__Parameters">
      {header}
      {radar}
      {inputs}
      {info}
    </div>;
  }

}

export default Markov;
