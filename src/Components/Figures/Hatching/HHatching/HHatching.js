import './HHatching.css';
import Hatching from '../Hatching';
import HHatchingIcon from '../../../../Icons/HHatching.svg';

const className = "HHatching";
const unauthorized = [];

/*Pencil*/
class HHatching extends Hatching {

  static get className() {
    return className;
  }

  static get icon() {
    return HHatchingIcon;
  }

  static get unauthorized() {
    return [...super.unauthorized, ...unauthorized];
  }

  constructor(props) {
    super(props);
    this.className += " " + HHatching.className;
  }

  drawFigure(sk) {
    const density = this.density;
    let gapY = this.height / density;
    let parent = sk.group();
    for(var j = 0; j <= density ; j++) {
      let line = sk.line(this.x, this.y + j * gapY, this.x + this.width, this.y + j * gapY);
      parent.addChild(line);
    }
    sk.setPathTransform(parent);
  }

}

export default HHatching;
