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
    this.x = 0;
    this.y = 0;
    this.width = 1;
    this.height = 1;
  }

  drawFigure(sk) {
    let i = this.x + this.width;
    let j = this.y + this.height;
    const density = this.state.density;
    let gapX = (this.width / density);
    let gapY = (this.height / density);
    while(j > this.y){
      sk.line(this.x, j, i, this.y);
      i -= gapX;
      j -= gapY;
    }

    i = this.x;
    j = this.y;
    while(j < this.y + this.height){
      sk.line(i, this.y + this.height, this.x + this.width, j);
      i += gapX;
      j += gapY;
    }
  }

}

export default ROHatching;
