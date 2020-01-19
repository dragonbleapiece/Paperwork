import './Ellipse.css';
import Figure from '../Figure';
import ellipse from '../../../Icons/full_ellipse.svg';

const className = "Ellipse";
const unauthorized = [];

/*Pencil*/
class Ellipse extends Figure {

  static get className() {
    return className;
  }

  static get icon() {
    return ellipse;
  }

  static get unauthorized() {
    return [...super.unauthorized, ...unauthorized];
  }

  constructor(props) {
    super(props);
    this.className += " " + Ellipse.className;
    this._x = this.width / 2;
    this._y = this.height / 2;
  }

  getTransforms() {
    return super.getTransforms().slice(0, 1); // Excludes rotation
  }

  drawFigure(sk) {
    let ellipse = sk.ellipse(this.x, this.y, this.width, this.height);
    sk.setPathTransform(ellipse);
  }

}

export default Ellipse;
