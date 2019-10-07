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
    this.width = 1;
    this.height = 1;
  }

  drawText(sk) {
    let text = sk.text(this.text, this.x, this.y);
    text.fontSize = this.height;
    sk.setPathTransform(text);
  }

  draw(sk) {
    sk.push();
      sk.fill(this.state.color.getColor(sk));
      sk.scale(this.state.scale.x, this.state.scale.y);
      this.drawText(sk);
    sk.pop();
  }
}

export default Character;
