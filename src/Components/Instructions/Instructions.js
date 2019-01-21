import React, { Component } from 'react';
import './Instructions.css';
import Canvas from '../Canvas/Canvas';
import Box from '../Box/Box';
import BoxGroup from '../BoxGroup/BoxGroup';
import {shallow, instance} from 'enzyme';
import { DragDropContextProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import ItemTypes from '../../Constants.js';

class Instructions extends BoxGroup {

  static _instance;
  static addElement(elmnt) {
    if(Instructions._instance !== undefined) {
      Instructions._instance.addElement(elmnt);
    }
  }

  constructor(props) {
    if(Instructions._instance !== undefined) {
      return Instructions._instance;
    }
    super(props);
    this.className = this.constructor.name;
    Instructions._instance = this;
  }


  componentDidUpdate() {
    let canvas = new Canvas();
    let next = undefined;
    let children = this.state.elements.reverse();
    let instance = undefined;

    if(children.length > 0) {
      for(let i = 0; i < children.length; ++i) {
        let child = children[i];
        if(child === undefined) continue;
        if(child instanceof Box) {
          child.addNext(next);
          next = child;
        }
        else if(shallow(child).instance() instanceof Box) {
          instance = shallow(child).instance();
          instance.addNext(next);
          next = instance;
        }
      }

      if(instance !== undefined) {
        canvas.sendDraw(instance.draw.bind(instance));
      } else {
        canvas.sendDraw(children[children.length - 1].draw.bind(children[children.length - 1]));
      }
    }
  }

  render() {
    return (
      <DragDropContextProvider backend={HTML5Backend}>
        <div className={this.className}>
          {this.props.children}
        </div>
      </DragDropContextProvider>
    );
  }
}

Instructions._instance = undefined;

export default Instructions;
