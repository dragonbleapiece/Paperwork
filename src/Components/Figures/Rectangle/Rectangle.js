import './Rectangle.css';
import Figure from '../Figure';
import square from '../../../Icons/full_square.svg';

const className = "Rectangle";
const unauthorized = [];

/*Pencil*/
class Rectangle extends Figure {

  static get className() {
    return className;
  }

  static get icon() {
    return square;
  }

  static get unauthorized() {
    return [...super.unauthorized, ...unauthorized];
  }

  constructor(props) {
    super(props);
    this.className += " " + Rectangle.className;
    this.x = 0;
    this.y = 0;
    this._width = 1;
    this._height = 1;
    this._scale = 0.9;
  }

  drawFigure(sk) {
    let rect = sk.rect(this.x, this.y, this.width, this.height);
    sk.setPathTransform(rect);
  }

}

export default Rectangle;
