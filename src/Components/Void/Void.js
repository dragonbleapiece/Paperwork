import Box from '../Box/Box';
import './Void.css';
import voidIcon from '../../Icons/void.svg';

const className = "Void";
const unauthorized = ["*"];

/*Pencil*/
class Void extends Box {

  static get className() {
    return className;
  }

  static get icon() {
    return voidIcon;
  }

  static get unauthorized() {
    return [...super.unauthorized, ...unauthorized];
  }

  constructor(props) {
    super(props);
    this.className += " " + Void.className;
    this.suppMenu = [];
  }

  getTransforms() {
    return null;
  }

}

export default Void;
