import './LOHatching.css';
import Hatching from '../Hatching';
import LOHatchingIcon from '../../../../Icons/LOHatching.svg';

const className = "LOHatching";
const unauthorized = [];

/*Pencil*/
class LOHatching extends Hatching {

  static get className() {
    return className;
  }

  static get icon() {
    return LOHatchingIcon;
  }

  static get unauthorized() {
    return [...super.unauthorized, ...unauthorized];
  }

  constructor(props) {
    super(props);
    this.className += " " + LOHatching.className;
    this.x = 0;
    this.y = 0;
    this._width = 1;
    this._height = 1;
  }

  drawFigure(sk) {
    let i = this.x;
    let j = this.y + this.height;
    const density = this.state.density;
    let gapX = (this.width / density);
    let gapY = (this.height / density);

    let parent = sk.group();

    while(i < this.x + this.width){
      let line = sk.line(i, this.y, this.x+this.width, j);
      parent.addChild(line);
      i += gapX;
      j -= gapY;
    }

    i = this.x + this.width;
    j = this.y;
    while(j < this.y + this.height){
      let line = sk.line(this.x, j, i, this.y+this.height);
      parent.addChild(line);
      i -= gapX;
      j += gapY;
    }

    sk.setPathTransform(parent);
  }

}

export default LOHatching;
