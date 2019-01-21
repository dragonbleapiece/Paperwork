import React, { Component } from 'react';
import {ItemTypes} from '../../Constants.js';
import {DragSource} from 'react-dnd';

const boxSource = {
  beginDrag(props, monitor, component) {
    return {};
  },
  endDrag(props, monitor) {
    return {};
  }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}


/*Pencil*/
class DragBox extends Component {


  state = {};

  constructor(props) {
    super(props);
  }


  render() {
    const { isDragging, connectDragSource } = this.props;

    return connectDragSource(
      <div className={this.props.className}>
        <span>{this.props.name}</span>
        {this.props.children}
      </div>
    );
  }
}

export default DragSource(ItemTypes.BOX, boxSource, collect)(DragBox);
