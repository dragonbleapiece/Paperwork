import Character from './Character';
import zero from '../../../Icons/zero.svg';

const className = "Zero";
const unauthorized = ["*"];

/*Pencil*/
class Number0 extends Character {
  static get className() {
    return className;
  }

  static get icon() {
    return zero;
  }

  static get unauthorized() {
    return [...super.unauthorized, ...unauthorized];
  }

  constructor(props) {
    super(props);
    this.className += " " + Number0.className;
    this.text = '0'
  }
}

export default Number0;
