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
      component.setState(item);
    }
    return {};
  }
};

//Standard functions for react-dnd
function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}


class DragBox extends Component {


  state = {
    x: undefined,
    y: undefined
  };

  constructor(props) {
    super(props);
  }


  render() {
    const { isDragging, connectDragSource } = this.props;

    const style = {
      "position": "absolute",
      "top": this.state.y + "px",
      "left": this.state.x + "px"
    };

    return (
      <div className={this.props.className} style={style}>
        {connectDragSource(<span>{this.props.name}</span>)}
        {this.props.children}
      </div>
    );
  }
}

export default DragSource(ItemTypes.BOX, boxSource, collect)(DragBox);
