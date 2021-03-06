import BoxGroup from '../BoxGroup/BoxGroup';
import Canvas from '../Canvas/Canvas';
import './Series.css';

const className = "Series";
const unauthorized = ["Placement", "Series", "Markov"];

/*Pencil*/
class Series extends BoxGroup {

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
    this.className += " " + Series.className;
    this.suppMenu = [];
    this.currentState = 0;
    Canvas.attach(this);
  }

  receiveNotification() {
    this.currentState = 0;
  }

  componentWillUnmount() {
    Canvas.detach(this);
  }

  setChildren(children) {
    super.setChildren(children);
    this.currentState = 0;
  }

  draw(sk) {
    if(this.elements.length === 0) return;

    if(this.elements[this.currentState]) this.elements[this.currentState].draw(sk);
    this.currentState = (this.currentState + 1) % this.elements.length;
  }

}

export default Series;
