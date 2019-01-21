import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import './BoxGroup.css';
import Box from '../Box/Box';
import {shallow, instance} from 'enzyme';
import p5 from 'p5';
import {ItemTypes} from '../../Constants.js';
import { DropTarget, DragSource } from 'react-dnd';

function collect(connect, monitor) {
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

const boxTarget = {
  canDrop(props, monitor) {
    // You can disallow drop based on props or item
    const item = monitor.getItem();
    //return canMakeChessMove(item.fromPosition, props.position);
    return true;
  },

  hover(props, monitor, component) {
    // This is fired very often and lets you perform side effects
    // in response to the hover. You can't handle enter and leave
    // here—if you need them, put monitor.isOver() into collect() so you
    // can just use componentDidUpdate() to handle enter/leave.

    // You can access the coordinates if you need them
    const clientOffset = monitor.getClientOffset();
    const componentRect = findDOMNode(component).getBoundingClientRect();

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
    const item = monitor.getItem();

    // You can do something with it
    //ChessActions.movePiece(item.fromPosition, props.position);

    console.log(monitor.getDropResult());

    // You can also do nothing and return a drop result,
    // which will be available as monitor.getDropResult()
    // in the drag source's endDrag() method
    return { moved: true };
  }
};

/*Pencil*/
class BoxGroup extends Box {

  constructor(props) {
    super(props);
    this.className = BoxGroup.name;
    this.state.elements = [];
  }

  setElements(elmnts) {
    if(elmnts !== undefined) {
      this.setState({
        elements: elmnts
      });
    }
  }

  draw(sk) {
    for(let i = 0; i < this.state.elements.length; ++i) {
       let element = this.state.elements[i];
       element.draw(sk);
    }
  }

  initElements(instance = Box, callback = function() {}) {

    let elements = [];

    const children = React.Children.map(this.props.children,
       (child, index) => {
              elements.push(child);
              //box.parent = callback;
    });

    this.setElements(elements);
  }

  componentDidMount() {
    this.initElements();
  }


  getDragBox() {
    const DropBox = this.getDropBox();

    let Component = (props) => {
      const { isDragging, connectDragSource } = props;
      return connectDragSource(
        <div className={props.className}>
          <span>{props.name}</span>
          <DropBox>
            {props.children}
          </DropBox>
        </div>
      );
    };
    return this.getDragSource(Component);
  }

  getDropTarget(box) {
    return DropTarget(ItemTypes.BOX, boxTarget, collect)(box);
  }

  getDropBox() {
    let Component = (props) => {
      const { isOver, canDrop, connectDropTarget } = props;
      return connectDropTarget(<div>{props.children}</div>);
    }

    return this.getDropTarget(Component);
  }

  render() {
    const DragBox = this.getDragBox();

    return (
      <DragBox name={this.constructor.name} className={this.className}>
        {this.props.chidren}
      </DragBox>
    );
  }
}

export default BoxGroup;
