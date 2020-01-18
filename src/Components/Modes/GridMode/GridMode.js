import './GridMode.css';
import Mode from "../Mode";

const modes = [
  {
    type: 'DiagonalLeft',
    name: 'Diagonal Left'
  },
  {
    type: 'DiagonalRight',
    name: 'Diagonal Right'
  },
  {
    type: 'LinearX',
    name: 'Linear X'
  },
  {
    type: 'LinearY',
    name: 'Linear Y'
  },
  {
    type: 'Orthogonal'
  },
  {
    type: 'SnailRight',
    name: 'Snail Right'
  }
];


/*Pencil*/
class GridMode extends Mode {

  state = {
  };

  constructor(props) {
    super(props);
    this.className += " " + GridMode.className;
    this.modes = modes;
  }

  mode(sk, data) {

  }

}

GridMode.className = "GridMode";

export default GridMode;
