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
import Black from '../Colors/Black';


class Workspace extends BoxGroup {

  static _instance;

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
    this.className = this.constructor.className;
    this.state.children = [];
    this.state.color = new Black();
    this.elements = []; //no this.state.elements
    this.unauthorized = ["Markov"];
    this.addDrawBeforeType("Figure", function(sk) {
      sk.translate(sk.width / 2, sk.height / 2)
      sk.scale(sk.width, sk.height);
      sk.strokeWeight(1 / sk.width);
    });
    Workspace._instance = this;
  }

  draw(sk) {
    sk.background(this.state.color.getP5Color(sk));
    sk.noStroke();
    super.draw(sk);
  }

  componentDidUpdate() {
    let canvas = new Canvas();
    canvas.sendDraw(this.draw.bind(this));
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
    return (
      <div className={this.className}>
        <ContextMenuBox id={this.constructor.className} unauthorized={this.unauthorized} suppMenu={this.suppMenu} el={this}>
          <DropBox>
            {!this.state.children.length && <span className="Workspace__placeholder">Right click here</span>}
            {this.getChildren()}
          </DropBox>
        </ContextMenuBox>
      </div>
    );
  }
}

Workspace.className = "Workspace";
Workspace._instance = undefined;

export default DragDropContext(HTML5Backend)(Workspace);
