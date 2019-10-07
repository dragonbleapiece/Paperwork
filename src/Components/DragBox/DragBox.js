import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import {ItemTypes} from '../../Constants.js';
import {DragSource} from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import Workspace from '../Workspace/Workspace';

//import Icons
import SVG from 'react-svg';
import cancel from '../../Icons/cancel.svg';
import minimize from '../../Icons/minimize.svg';

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
    console.log(item.hovered);
    if(result !== null && result.moved) {
      props.el.removeFromParent();
      item.hovered.pushChild({type: props.el.constructor, id: props.el.props.id, state: props.el.state});
      //component.setPosition(item);
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
    const left = parseInt(this.props.el.state.style.left);
    const top = parseInt(this.props.el.state.style.top);

    const coord = {
      x: !Number.isNaN(left) ? left : 0,
      y: !Number.isNaN(top) ? top : 0
    };

    const style = {
      "position": "absolute",
      "top": d.y + coord.y + "px",
      "left": d.x + coord.x + "px"
    };
    console.log(coord);
    this.props.el.setStyle(style);
  }

  onClose() {
      if(this.props.onClose !== undefined) {
        this.props.onClose();
      }
      Workspace.forceUpdate();
  }

  onMinimize() {
    if(this.props.onMinimize !== undefined) {
      this.props.onMinimize();
    }
    Workspace.forceUpdate();
  }


  render() {
    const { isDragging, connectDragSource, connectDragPreview } = this.props;

    if(isDragging) {
      return null;
    }

    return(
      <div className="Box__wrapper">
        <div className="Box_titleOptions">
          <span className="Box__titleOption" onClick={this.onMinimize.bind(this)}>
              <SVG src={minimize}/>
          </span>
          <span className="Box__titleOption" onClick={this.onClose.bind(this)}>
              <SVG src={cancel}/>
          </span>
        </div>
        {connectDragSource(<span className="Box__title">
          {this.props.icon && <SVG className="Box__titleIcon" src={this.props.icon} style={{fill: this.props.color, backgroundColor: this.props.backgroundColor}}/>}
          <span className="Box__titleText" style={{color: this.props.textColor}}>{this.props.name}</span>
        </span>)}
        {this.props.children}
      </div>
    );
  }
}

export default DragSource(ItemTypes.BOX, boxSource, collect)(DragBox);
