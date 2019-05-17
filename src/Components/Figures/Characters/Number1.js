import Character from './Character';
import one from '../../../Icons/one.svg';

const className = "One";
const unauthorized = ["*"];

/*Pencil*/
class Number1 extends Character {
  static get className() {
    return className;
  }

  static get icon() {
    return one;
  }

  static get unauthorized() {
    return [...super.unauthorized, ...unauthorized];
  }

  constructor(props) {
    super(props);
    this.className += " " + Number1.className;
    this.text = '1'
  }
}

export default Number1;
