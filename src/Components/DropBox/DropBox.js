import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import {ItemTypes} from '../../Constants.js';
import { DropTarget, DragSource } from 'react-dnd';

//Standard functions for react-dnd
function collect(connect, monitor) {
  console.log(monitor.getItemType());
  return {
    // Call this function inside render()
    // to let React DnD handle the drag events:
    connectDropTarget: connect.dropTarget(),
    // You can ask the monitor about the current drag state:
    isOver: monitor.isOver(),
    isOverCurrent: monitor.isOver({ shallow: true }),
    canDrop: monitor.canDrop(),
    itemType: monitor.getItemType()
  };
}

//Functions for dropping the box
const boxTarget = {
  /*canDrop(props, monitor) {
    // You can disallow drop based on props or item
    const item = monitor.getItem();
    //return canMakeChessMove(item.fromPosition, props.position);
    return true;
  },*/

  hover(props, monitor, component) {
    // This is fired very often and lets you perform side effects
    // in response to the hover. You can't handle enter and leave
    // here—if you need them, put monitor.isOver() into collect() so you
    // can just use componentDidUpdate() to handle enter/leave.

    return;

    // You can access the coordinates if you need them

    // You can check whether we're over a nested drop target
    const isJustOverThisOne = monitor.isOver({ shallow: true });

    // You will receive hover() even for items for which canDrop() is false
    const canDrop = monitor.canDrop();
  },

  drop(props, monitor, component) {
    if (monitor.didDrop()) {
      // If you want, you can check whether some nested
      // target already handled drop
      return;
    }

    // Obtain the dragged item
    let item = monitor.getItem();

    // You can do something with it
    const clientOffset = monitor.getClientOffset();
    const componentRect = findDOMNode(component).getBoundingClientRect();

    if(clientOffset.x > componentRect.right
      || clientOffset.y > componentRect.bottom
      || clientOffset.x < componentRect.left
      || clientOffset.y < componentRect.top) {
      return;
    }

    // You give to the currently moving item the new positions
    item.x += clientOffset.x;
    item.y += clientOffset.y;


    // You can also do nothing and return a drop result,
    // which will be available as monitor.getDropResult()
    // in the drag source's endDrag() method
    return { moved: true };
  }
};


class DropBox extends Component {


  state = {};

  constructor(props) {
    super(props);
  }


  render() {
    const { isOver, canDrop, connectDropTarget } = this.props;
    return connectDropTarget(
      <div className={this.constructor.name}>
        {this.props.children}
      </div>
    );
  }
}

export default DropTarget(ItemTypes.BOX, boxTarget, collect)(DropBox);
