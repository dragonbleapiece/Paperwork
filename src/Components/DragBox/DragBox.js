import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import {ItemTypes} from '../../Constants.js';
import {DragSource} from 'react-dnd';
import Workspace from '../Workspace/Workspace';

//import Icons
import SVG from 'react-svg';
import cancel from '../../Icons/cancel.svg';

//Functions for dragging the box
const boxSource = {
  beginDrag(props, monitor, component) {
    const componentRect = findDOMNode(component).getBoundingClientRect();
    const clientOffset = monitor.getClientOffset();
    let item = clientOffset;
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

  setPosition(d) {
    if(!d) return;
    const coord = {
      x: !Number.isNaN(parseInt(this.props.el.state.style.left)) ? parseInt(this.props.el.state.style.left) : 0,
      y: !Number.isNaN(parseInt(this.props.el.state.style.top)) ? parseInt(this.props.el.state.style.top) : 0
    };

    console.log(coord);
    const style = {
      "position": "absolute",
      "top": d.y + coord.y + "px",
      "left": d.x + coord.x + "px"
    };
    this.props.el.setStyle(style);
  }

  onClose() {
      if(this.props.onClose !== undefined) {
        this.props.onClose();
      }
      Workspace.forceUpdate();
  }


  render() {
    const { isDragging, connectDragSource, connectDragPreview } = this.props;



    return connectDragPreview(
      <div>
        {connectDragSource(<span className="Box__title">
          {this.props.icon && <SVG className="Box__titleIcon" src={this.props.icon}/>}
          <span className="Box__titleText">{this.props.name}</span>
          <span className="Box__titleClose button" onClick={this.onClose.bind(this)}>
            <SVG src={cancel}/>
          </span>
        </span>)}
        {this.props.children}
      </div>
    );
  }
}

export default DragSource(ItemTypes.BOX, boxSource, collect)(DragBox);
