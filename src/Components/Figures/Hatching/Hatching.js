import React from 'react';
import Figure from '../Figure';
import Transform from '../../Transforms/Transform'
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

  get density() {
    if(this.transforms['density']) {
      return this.transforms['density'].getInputValue();
    } else {
      return this._density;
    }
  }

  constructor(props) {
    super(props);
    this.className += " " + Hatching.className;
    this._density = 11;
  }

  getTransforms() {
    const Transforms = [
      // Density
      <Transform
        min={2}
        max={20}
        defaultValue={this._density}
        marks={{2:1, 11:10, 20:19}}
        step={1}
        key={0}
        ref={(el) => {this.transforms['density'] = el}}
      />
    ];
    return Transforms;
  }

  draw(sk) {
    sk.stroke(this.state.color.getColor(sk));
    super.draw(sk);
    sk.noStroke();
  }

}

export default Hatching;
