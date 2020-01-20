import React from 'react';
import Box from '../Box/Box';
import Transform from '../Transforms/Transform';
import scale from '../../Icons/scale.svg';
import rotate from '../../Icons/rotate_left.svg';
import move from '../../Icons/move.svg';
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
      return {x: this._scale, y: this._scale};
    }
  }

  get rotation() {
    if(this.transforms['rotation']) {
      return this.transforms['rotation'].getInputValue();
    } else {
      return this._rotation;
    }
  }

  get width() {
    return this._width;
  }

  get height() {
    return this._height;
  }

  get position() {
    if(this.transforms['translate']) {
      return this.transforms['translate'].getInputValue();
    } else {
      return {x: this._x, y: this._y};
    }
  }

  get x() {
    if(this.transforms['translate']) {
      return this.transforms['translate'].getInputValue();
    } else {
      return this._x;
    }
  }

  get y() {
    if(this.transforms['translate']) {
      return this.transforms['translate'].getInputValue();
    } else {
      return this._y;
    }
  }

  constructor(props) {
    super(props);
    this.className += " " + Figure.className;
    this._x = 0;
    this._y = 0;
    this._rotation = 0;
    this._height = 1;
    this._width = 1;
    this._scale = 1;
  }

  drawFigure(sk) {

  }
  
  getTransforms() {
    const Transforms = [
      // Translation
      <Transform 
        min={-1}
        max={1}
        defaultValue={this._x}
        marks={{'-1':-1, 0:0, 1:1}}
        step={0.1}
        key={0}
        ref={(el) => {this.transforms['translate'] = el}}
        icon={move}
      />,
      // Scale
      <Transform 
        min={0.1}
        max={1.5}
        defaultValue={this._scale}
        marks={{0.1:0.1, 1:1, 1.5:1.5}}
        step={0.1}
        key={1}
        ref={(el) => {this.transforms['scale'] = el}}
        returns={(value) => ({x: value, y: value})}
        icon={scale}
      />,
      // Rotation
      <Transform 
        min={0}
        max={360}
        defaultValue={this._rotation}
        marks={{0:0, 90:90, 180:180, 270:270, 360:360}}
        step={1}
        key={2}
        ref={(el) => {this.transforms['rotation'] = el}}
        icon={rotate}
      />
    ];
    return Transforms;
  }

  draw(sk) {
    const scale = this.scale;
    sk.push();
      sk.fill(this.state.color.getColor(sk));
      //console.log(-sk.scaleValue.x / 2 + this.x * sk.scaleValue.x, -sk.scaleValue.y / 2 + this.y * sk.scaleValue.y);
      sk.translate(-0.5 + this.x, -0.5 + this.y);
      sk.scale(scale.x, scale.y, 0.5, 0.5);
      sk.rotate(this.rotation, 0.5, 0.5);
      this.drawFigure(sk);
    sk.pop();
  }
}

export default Figure;
