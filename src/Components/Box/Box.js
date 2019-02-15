import React, { Component } from 'react';
import './Box.css';
import p5 from 'p5';
import DropBox from '../DropBox/DropBox';
import DragBox from '../DragBox/DragBox';
import ContextMenuBox from '../ContextMenuBox/ContextMenuBox';
import { ContextMenuTrigger } from "react-contextmenu";
import Color from '../Colors/Color';
import Scale from '../Transforms/Scale/Scale';

const menuColor = [
  {
    type: 'Color',
    elements: [
      {type: 'Blue'},
      {type: 'Cyan'},
      {type: 'Magenta'},
      {type: 'Yellow'},
      {type: 'Black'},
      {type: 'White'}
    ]
  }
];


/*Pencil*/
class Box extends Component {

  static get id() {
    return Box._id++;
  }

  state = {
    children: [],
    style: {}
  };

  constructor(props) {
    super(props);

    if(props && this.props.state) {
      this.state = this.props.state;
    } else {
      this.initState();
    }

    this.className = Box.className;
    this.name = Box.className;
    this.next = undefined;
    this.nextType = undefined;
    this.unauthorized = [];
    this.drawBeforeType = {};
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
    this.state.color = new Color(255, 255, 255);
    this.state.scale = {x: 1, y: 1};
  }

  addDrawBeforeType(type, f) {
    if(!(f instanceof Function)) return;
    if(!this.drawBeforeType[type]) {
      this.drawBeforeType[type] = [f];
    } else {
      this.drawBeforeType[type].push(f);
    }
  }

  callDrawBeforeType(sk, type) {
    for(let i = 0; i < this.drawBeforeType[type].length; ++i) {
      this.drawBeforeType[type][i](sk);
    }
  }

  addChild(child) {
    if(!child) return;
    let obj = new child(); //tricky
    if(window.isAuthorized(child, this.unauthorized) && obj instanceof Box) {
      this.setState({
        children: [{type:child, id:Box.id}]
      });
    }
  }

  pushChild(child) {
    if(!child || !child.type || !child.id) return;
    let obj = new child.type(); //tricky
    if(window.isAuthorized(child.type, this.unauthorized) && obj instanceof Box) {
      this.setState({
        children: [child]
      });
    }
  }

  setChildren(children) {
    this.setState({
      children: children
    })
  }

  removeFromParent() {
    let children = this.props.parent.state.children;
    children = children.filter(el => el.id !== this.props.id);
    this.props.parent.setChildren(children);
  }

  addNext(elmnt) {
    if(elmnt !== undefined) {
      if(elmnt instanceof Box) {
        this.next = elmnt;
        this.nextType = elmnt.constructor.name;
      }
    }
  }

  setStyle(style) {
    this.setState({
      style: style
    });
  }

  drawBeforeChild(sk, child) {
    if(!child) return;
    for(let key in this.drawBeforeType) {
      console.log(key);
      if(child instanceof window.getClassFromName(key)) {
        this.callDrawBeforeType(sk, key);
      }
    }
  }

  draw(sk) {

  }

  getChildren() {
    this.next = undefined;
    let children = [];

    if(this.state.children.length > 0) {
      let child = this.state.children[0];
      children.push(<child.type key={child.id} parent={this} id={child.id} ref={el => {this.next = el}} saveState={(state) => {child.state = state}} state={child.state}/>);
    }
    return children;
  }

  renderBox() {
    return null;
  }

  getTransforms() {
    return (
      <Scale onChange={(scale) => {this.setState({scale: scale});}}/>
    );
  }

  componentDidUpdate() {
    const {saveState} = this.props;
    if(saveState) {
      saveState(this.state);
    }
  }

  render() {
    let c = this.state.color;
    let formatedColor = (c.r+c.g+c.b !== 0) ? "rgba("+c.r+", "+c.g+", "+c.b+", "+c.a/255+")" : "rgba(255, 255, 255, 1)";

    return (
      <div className={this.className} style={this.state.style}>
        <ContextMenuBox id={this.constructor.className + this.props.id} unauthorized={this.unauthorized} suppMenu={this.suppMenu} el={this}>
          <DragBox icon={this.constructor.icon} color={formatedColor} name={this.constructor.className} onClose={this.removeFromParent.bind(this)} el={this}>
            <span className="Box__content">
              <ContextMenuTrigger id={""}>
                {this.renderBox()}
                {this.getTransforms()}
              </ContextMenuTrigger>
              <DropBox el={this}>
                <ContextMenuTrigger id={this.constructor.className + this.props.id}>
                  {this.unauthorized.indexOf("*") === -1 && <div className="Box__container">
                    {!this.state.children.length && <span className="Box__placeholder">Right click to add</span>}
                    {this.getChildren()}
                  </div>}
                </ContextMenuTrigger>
              </DropBox>
            </span>
          </DragBox>
        </ContextMenuBox>
      </div>
    );
  }
}

Box._id = 0; //or use shortid ?
Box.className = "Box";
Box.icon = undefined;

export default Box;
