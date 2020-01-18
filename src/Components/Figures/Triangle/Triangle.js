import './Triangle.css';
import Figure from '../Figure';
import triangle from '../../../Icons/full_triangle.svg';

const className = "Triangle";
const unauthorized = [];

/*Pencil*/
class Triangle extends Figure {

  static get className() {
    return className;
  }

  static get icon() {
    return triangle;
  }

  static get unauthorized() {
    return [...super.unauthorized, ...unauthorized];
  }

  constructor(props) {
    super(props);
    this.className += " " + Triangle.className;
    this.x = 0;
    this.y = 0;
    this._width = 1;
    this._height = 1;
  }

  drawFigure(sk) {
    let triangle = sk.triangle(this.x, this.y, this.width);
    sk.setPathTransform(triangle);
  }
}


export default Triangle;
