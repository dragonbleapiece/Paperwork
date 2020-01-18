import Figure from '../Figure';
import './Character.css';

const className = "Character";
const unauthorized = ["*"];

/*Pencil*/
class Character extends Figure {

  static get className() {
    return className;
  }

  static get icon() {
    return undefined;
  }

  static get unauthorized() {
    return [...super.unauthorized, ...unauthorized];
  }

  constructor(props) {
    super(props);
    this.className += " " + Character.className;
    this.x = 0;
    this.y = 0;
    this.text = 'noText'
    this._width = 1;
    this._height = 1;
  }

  drawFigure(sk) {
    let text = sk.text(this.text, this.x, this.y);
    text.fontSize = this.height;
    sk.setPathTransform(text);
  }
}

export default Character;
