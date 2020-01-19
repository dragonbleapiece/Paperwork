import './ROHatching.css';
import Hatching from '../Hatching';
import ROHatchingIcon from '../../../../Icons/ROHatching.svg';

const className = "ROHatching";
const unauthorized = [];

/*Pencil*/
class ROHatching extends Hatching {

  static get className() {
    return className;
  }

  static get icon() {
    return ROHatchingIcon;
  }

  static get unauthorized() {
    return [...super.unauthorized, ...unauthorized];
  }

  constructor(props) {
    super(props);
    this.className += " " + ROHatching.className;
  }

  drawFigure(sk) {
    let i = this.x + this.width;
    let j = this.y + this.height;
    const density = this.density;
    let gapX = (this.width / density);
    let gapY = (this.height / density);

    let parent = sk.group();

    while(j > this.y){
      let line = sk.line(this.x, j, i, this.y);
      parent.addChild(line);
      i -= gapX;
      j -= gapY;
    }

    i = this.x;
    j = this.y;
    while(j < this.y + this.height){
      let line = sk.line(i, this.y + this.height, this.x + this.width, j);
      parent.addChild(line);
      i += gapX;
      j += gapY;
    }
    sk.setPathTransform(parent);
  }

}

export default ROHatching;
