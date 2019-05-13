import Character from './Character';

const className = "0";
const unauthorized = ["*"];

/*Pencil*/
class Number0 extends Character {
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
    this.className += " " + Number0.className;
    this.text = '0'
  }
}

export default Number0;
