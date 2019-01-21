import React, { Component } from 'react';
import './Box.css';
import p5 from 'p5';
import {ItemTypes} from '../../Constants.js';
import {DragSource} from 'react-dnd';

const boxSource = {
  beginDrag(props) {
    return {};
  },
  endDrag(props, monitor) {
    return monitor.getDropResult();
  }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}


/*Pencil*/
class Box extends Component {


  state = {};

  constructor(props) {
    super(props);
    this.className = Box.name;
    this.next = undefined;
    this.nextType = undefined;
  }

  addNext(elmnt) {
    if(elmnt !== undefined) {
      if(elmnt instanceof Box) {
        this.next = elmnt;
        this.nextType = elmnt.constructor.name;
      }
    }
  }

  getDragBox() {
    let self = this;
    let Component = (props) => {
      const { isDragging, connectDragSource } = props;
      return connectDragSource(
        <div className={props.className}>
          <span>{props.name}</span>
          {props.children}
        </div>
      );
    };
    return this.getDragSource(Component);
  }

  getDragSource(box) {
    return DragSource(ItemTypes.BOX, boxSource, collect)(box);
  }

  draw(sk) {

  }

  render() {

    const DragBox = this.getDragBox();

    return (
      <DragBox name={this.constructor.name} className={this.className}>
        {this.props.children}
      </DragBox>
    );
  }
}

Box.nbBox = 0;

export default Box;
