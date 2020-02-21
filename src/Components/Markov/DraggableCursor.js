import React, { Component } from 'react';
import shortid from 'shortid';

const CLASSNAME = 'Radar__Draggable'
const DRAGGINGCLASS = 'isDragging';

class DraggableCursor extends Component {

  state = {isDragging: false};

  constructor(props) {
    super(props);
    this.ratio = 1;
    this.onMouseMoveHandler = this.onMouseMove.bind(this);
    this.onMouseUpHandler = this.onMouseUp.bind(this);
    this.movement = 0;
  }

  onMouseDown(e) {
    if(e.button !== 0) return;
    window.addEventListener('mousemove', this.onMouseMoveHandler);
    window.addEventListener('mouseup', this.onMouseUpHandler);
    this.ratio = e.target.getBoundingClientRect().width / (this.props.r * 2);
    this.onDragStart(e);
  }

  onMouseUp(e) {
    if(e.button !== 0) return;
    window.removeEventListener('mousemove', this.onMouseMoveHandler);
    window.removeEventListener('mouseup', this.onMouseUpHandler);
    this.onDragEnd(e);
  }

  onMouseMove(e) {
    if(!this.state.isDragging) return;
    this.onDrag(e);
  }

  onDragStart(e) {
    this.setState({isDragging: true});
    e.stopPropagation();
    e.preventDefault();
  }

  onDragEnd(e) {
    this.setState({isDragging: false});
    this.movement = 0;
    e.stopPropagation();
    e.preventDefault();
    if(this.props.onAfterChange) {
      this.props.onAfterChange();
    }
  }

  onDrag(e) {
    const {vector, step, radius, minRadius, maxRadius, onChange} = this.props;

    const scalar = e.movementX * vector.x  + e.movementY * vector.y;
    this.movement -= scalar;
    if(Math.abs(this.movement) >= step * this.ratio) {
      const movement = Math.sign(this.movement) * Math.floor(Math.abs(this.movement) / (step * this.ratio));
      const newRadius = radius + movement;
      this.movement -= movement * step * this.ratio;
      if(minRadius <= newRadius && newRadius <= maxRadius && onChange) {
        onChange(newRadius);
      }
    }
    e.stopPropagation();
    e.preventDefault();
  }

  render() {

    const {cx, cy, r} = this.props;
    const className = CLASSNAME + (this.state.isDragging ? ' ' + DRAGGINGCLASS : '');

    return <circle
      cx={cx}
      cy={cy}
      r={r}
      className={className}
      onMouseDown={this.onMouseDown.bind(this)}
    />;
  }

}

export default DraggableCursor;
