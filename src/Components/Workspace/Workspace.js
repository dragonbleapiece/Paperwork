import React, { Component } from 'react';
import './Workspace.css';
import Canvas from '../Canvas/Canvas';
import Box from '../Box/Box';
import BoxGroup from '../BoxGroup/BoxGroup';
import {shallow, instance} from 'enzyme';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import ItemTypes from '../../Constants.js';
import DropBox from '../DropBox/DropBox';
import DragBox from '../DragBox/DragBox';
import ContextMenuBox from '../ContextMenuBox/ContextMenuBox';

class Workspace extends BoxGroup {

  static _instance;
  static setElements(elmnts) {
    if(Workspace._instance !== undefined) {
      Workspace._instance.setElements(elmnts);
    }
  }

  static addElement(elmnt) {
    if(Workspace._instance !== undefined) {
      Workspace._instance.addElement(elmnt);
    }
  }

  static addChild(box) {
    if(Workspace._instance !== undefined) {
      Workspace._instance.addChild(box);
    }
  }

  static forceUpdate() {
    if(Workspace._instance !== undefined) {
      Workspace._instance.forceUpdate();
    }
  }

  constructor(props) {
    if(Workspace._instance !== undefined) {
      return Workspace._instance;
    }
    super(props);
    this.className = this.constructor.name;
    this.state.children = [];
    this.elements = []; //no this.state.elements
    Workspace._instance = this;
  }

  addChild(box) {
    if(!box) return;
    let obj = new box; //tricky
    if(obj instanceof Box) {
      let children = this.state.children;
      children.push(box);
      this.setState({
        children: children
      });
    }
  }

  componentDidUpdate() {
    let canvas = new Canvas();
    let firstBox = this.elements[0];
    if(firstBox !== undefined) {
      canvas.sendDraw(firstBox.draw.bind(firstBox));
    }
  }

  //dead code
  /*componentDidUpdate() {
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
  }*/

  render() {
    let children = [];
    for(let i = 0; i < this.state.children.length; ++i) {
      let Component = this.state.children[i];
      children.push(<Component key={i} ref={el => this.elements[i] = el}/>);
    }

    return (
      <div className={this.className}>
        <ContextMenuBox id={this.constructor.name} unauthorized={this.unauthorized}>
          <DropBox>
            {children}
          </DropBox>
        </ContextMenuBox>
      </div>
    );
  }
}

Workspace._instance = undefined;

export default DragDropContext(HTML5Backend)(Workspace);
