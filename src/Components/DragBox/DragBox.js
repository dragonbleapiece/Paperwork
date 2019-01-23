import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import {ItemTypes} from '../../Constants.js';
import {DragSource} from 'react-dnd';

//Functions for dragging the box
const boxSource = {
  beginDrag(props, monitor, component) {
    const componentRect = findDOMNode(component).getBoundingClientRect();
    let item = {
      x: -componentRect.width / 2,
      y: -componentRect.height / 2
    }
    return item;
  },
  endDrag(props, monitor, component) {
    const item = monitor.getItem();
    const result = monitor.getDropResult();
    if(result !== null && result.moved) {
      component.setPosition(item);
    }
    return {};
  }
};

//Standard functions for react-dnd
function collect(connect, monitor) {
  return {
    connectDragPreview: connect.dragPreview(),
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}


class DragBox extends Component {

  constructor(props) {
    super(props);
  }

  setPosition(coord) {
    if(!coord) return;
    const style = {
      "position": "absolute",
      "top": coord.x + "px",
      "left": coord.y + "px"
    };
    this.props.setPosition(style);
  }

  render() {
    const { isDragging, connectDragSource, connectDragPreview } = this.props;



    return connectDragPreview(
      <div>
        {connectDragSource(<span>{this.props.name}</span>)}
        {this.props.children}
      </div>
    );
  }
}

export default DragSource(ItemTypes.BOX, boxSource, collect)(DragBox);
