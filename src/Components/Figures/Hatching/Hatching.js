import React from 'react';
import Figure from '../Figure';
import Density from '../../Transforms/Density/Density'
import './Hatching.css';

const className = "Hatching";
const unauthorized = [];

/*Pencil*/
class Hatching extends Figure {

  static get className() {
    return className;
  }

  static get icon() {
    return undefined;
  }

  static get unauthorized() {
    return [...super.unauthorized, ...unauthorized];
  }

  initState() {
    super.initState();
    this.state.density = 11;
  }

  constructor(props) {
    super(props);
    this.className += " " + Hatching.className;
  }

  getTransforms() {
    let Transforms = new Array();
    Transforms.push(<Density key={0} onChange={(density) => {this.setState({density: density});}}/>);
    return Transforms;
  }

  draw(sk) {
    sk.stroke(this.state.color.getColor(sk));
    super.draw(sk);
    sk.noStroke();
  }

}

export default Hatching;
