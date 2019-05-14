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
    sk.text(this.text, this.x, this.y);
  }

  draw(sk) {
    const bbox = sk.currentFont.textBounds(this.text, this.x, this.y, this.height);
    sk.push();
      sk.fill(this.state.color.getP5Color(sk));
      sk.scale(this.state.scale.x, this.state.scale.y);
      sk.textSize(this.height);
      sk.translate(-sk.textWidth(this.text) / 2, bbox.h / 2);
      this.drawText(sk);
    sk.pop();
  }
}

export default Character;
