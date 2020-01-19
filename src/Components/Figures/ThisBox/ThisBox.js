import Figure from '../Figure';
import Canvas from '../../Canvas/Canvas';
import './ThisBox.css';
import thisIcon from '../../../Icons/my_location.svg';

const className = "ThisBox";
const unauthorized = ["*"];

/*Pencil*/
class ThisBox extends Figure {

  static get className() {
    return className;
  }

  static get icon() {
    return thisIcon;
  }

  static get unauthorized() {
    return [...super.unauthorized, ...unauthorized];
  }

  constructor(props) {
    super(props);
    this.className += " " + ThisBox.className;
    this.suppMenu = [];
    this.recursionParent = null;
    this.recursion = 0;
    Canvas.attach(this);
  }

  receiveNotification() {
    this.recursion = 0;
  }

  componentDidMount() {
    this.getRecursionDraw();
  }

  componentWillUnmount() {
    Canvas.detach(this);
  }

  getRecursionDraw() {
    let parent = this.props.parent;
    while(parent && parent.constructor.className !== 'Recursion') {
        parent = parent.props.parent;    
    }
    if(!parent) {
        this.onClose();
    } else {
        this.recursionParent = parent;
    }
  }

  onDragStart(e) {
    e.preventDefault();
  }

  drawFigure(sk) {
    if(this.recursionParent && this.recursion < this.recursionParent.state.recursionMax) {
      ++this.recursion;
      this.recursionParent.draw(sk);
    }
  }

}

export default ThisBox;