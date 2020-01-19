import './VHatching.css';
import Hatching from '../Hatching';
import VHatchingIcon from '../../../../Icons/VHatching.svg';

const className = "VHatching";
const unauthorized = [];

/*Pencil*/
class VHatching extends Hatching {

  static get className() {
    return className;
  }

  static get icon() {
    return VHatchingIcon;
  }

  static get unauthorized() {
    return [...super.unauthorized, ...unauthorized];
  }

  constructor(props) {
    super(props);
    this.className += " " + VHatching.className;
  }

  drawFigure(sk) {
    const density = this.density;
    let gapX = this.width / density;

    let parent = sk.group();

    for(var i = 0; i <= density ; i++){
      let line = sk.line(this.x + i * gapX, this.y, this.x + i * gapX, this.y + this.height);
      parent.addChild(line);
    }

    sk.setPathTransform(parent);
  }

}

export default VHatching;
