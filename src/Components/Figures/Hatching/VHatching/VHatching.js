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
    this.x = 0;
    this.y = 0;
    this.width = 1;
    this.height = 1;
  }

  drawFigure(sk) {
    const density = this.state.density;
    let gapX = this.width / density;
    for(var i = 0; i <= density ; i++){
      sk.line(this.x + i * gapX, this.y, this.x + i * gapX, this.y + this.height);
    }
  }

}

export default VHatching;
