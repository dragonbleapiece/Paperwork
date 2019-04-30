import Box from '../Box/Box';
import './Figure.css';

const className = "Figure";
const unauthorized = ["*"];

/*Pencil*/
class Figure extends Box {

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
    this.className += " " + Figure.className;
    this.x = 0;
    this.y = 0;
    this.width = 0;
    this.height = 0;
  }

  drawFigure(sk) {

  }

  draw(sk) {
    sk.push();
      sk.fill(this.state.color.getP5Color(sk));
      sk.scale(this.state.scale.x, this.state.scale.y);
      sk.translate(-this.width / 2, -this.height / 2);
      this.drawFigure(sk);
    sk.pop();
  }
}

export default Figure;
