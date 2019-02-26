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

const menuColor = [
  {
    type: 'Background Color',
    elements: [
      {type: 'Black'},
      {type: 'White'},
      {type: 'Blue'},
      {type: 'Cyan'},
      {type: 'Magenta'},
      {type: 'Yellow'}
    ]
  }
];

const className = "Workspace";
const unauthorized = ["Markov", "Series"];

class Workspace extends BoxGroup {

  static _instance;

  static get className() {
    return className;
  }

  static get icon() {
    return undefined;
  }

  static get unauthorized() {
    return unauthorized;
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
    this.className = this.constructor.className;
    this.elements = []; //no this.state.elements
    this.addDrawBeforeType("Figure", function(sk) {
      sk.translate(sk.width / 2, sk.height / 2)
      sk.scale(sk.width, sk.height);
      sk.strokeWeight(1 / sk.width);
    });
    Workspace._instance = this;
    // Redefinition of Menu Colors
    this.suppMenu = [{
      menu: menuColor,
      handleClick: (event, data) => {
       if(data.type) {
         let color = window.getClassFromName(data.type);
         if(color) this.setState({color: new color()});
         window.updateWorkspace();
       }
      }
    }];
  }

  initState() {
    super.initState();
    this.state.children = [];
    this.state.color = new Black();
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

  render() {
    return (
      <div className={this.className}>
        <ContextMenuBox id={this.constructor.className} unauthorized={this.unauthorized} suppMenu={this.suppMenu} el={this}>
          <DropBox el={this}>
            {!this.state.children.length && <span className="Workspace__placeholder">Right click here</span>}
            {this.getChildren()}
          </DropBox>
        </ContextMenuBox>
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(Workspace);
