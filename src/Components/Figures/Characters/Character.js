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
    this.text = 'noText';
  }

  drawFigure(sk) {
    let text = sk.text(this.text, 0.5, 0.85);
    text.fontSize = this.height;
    sk.setPathTransform(text);
  }
}

export default Character;
