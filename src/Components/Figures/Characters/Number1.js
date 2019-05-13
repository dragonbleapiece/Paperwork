import Character from './Character';

const className = "1";
const unauthorized = ["*"];

/*Pencil*/
class Number1 extends Character {
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
    this.className += " " + Number1.className;
    this.text = '1'
  }
}

export default Number1;
