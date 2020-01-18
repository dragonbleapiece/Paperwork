import React from 'react';
import Box from '../Box/Box';
import Transform from '../Transforms/Transform';
import scale from '../../Icons/scale.svg';
import './Figure.css';

const className = "Figure";
const unauthorized = ["*"];

/*Pencil*/
class Figure extends Box {

  static get className() {
    return className;
  }

  static get icon() {
    return undefined;
  }

  static get unauthorized() {
    return [...super.unauthorized, ...unauthorized];
  }

  get scale() {
    if(this.transforms['scale']) {
      return this.transforms['scale'].getInputValue();
    } else {
      return this._scale;
    }
  }

  get width() {
    return this._width;
  }

  get height() {
    return this._height;
  }

  constructor(props) {
    super(props);
    this.className += " " + Figure.className;
    this._x = 0;
    this._y = 0;
    this._height = 1;
    this._width = 1;
    this._scale = 1;
  }

  drawFigure(sk) {

  }
  
  getTransforms() {
    let Transforms = new Array();
    Transforms.push(<Transform 
      min={0.1}
      max={2}
      defaultValue={this._scale}
      marks={{0.1:0.1, 1:1, 2:2}}
      step={0.1}
      key={0}
      ref={(el) => {this.transforms['scale'] = el}}
      returns={(value) => ({x: value, y: value})}
      icon={scale}
    />);
    return Transforms;
  }

  draw(sk) {
    const scale = this.scale;
    sk.push();
      sk.fill(this.state.color.getColor(sk));
      sk.scale(scale.x, scale.y);
      sk.translate(-this.width / 2, -this.height / 2);
      this.drawFigure(sk);
    sk.pop();
  }
}

export default Figure;
