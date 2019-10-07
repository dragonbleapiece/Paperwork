import React, { Component } from 'react';
import './Box.css';
import DropBox from '../DropBox/DropBox';
import DragBox from '../DragBox/DragBox';
import ContextMenuBox from '../ContextMenuBox/ContextMenuBox';
import { ContextMenuTrigger } from "react-contextmenu";
import Color from '../Colors/Color';
import Scale from '../Transforms/Scale/Scale';
import Paper from 'paper'

const menuColor = [
  {
    type: 'Color',
    elements: [
      {type: 'Black'},
      {type: 'White'},
      {type: 'Red'},
      {type: 'Orange'},
      {type: 'Yellow'},
      {type: 'Green'},
      {type: 'LightBlue'},
      {type: 'Blue'}
    ]
  }
];

const className = "Box";
const unauthorized = [];

function getFunctionClass(child, object) {
  for(let key in object) {
    const cl = window.getClassFromName(key);
    if(!cl) return undefined;
    const instanceOfChild = new child();
    if(instanceOfChild instanceof cl) {
      return object[key];
    }
  }
}

/*Pencil*/
class Box extends Component {

  static get id() {
    return Box._id++;
  }

  static get className() {
    return className;
  }

  static get icon() {
    return undefined;
  }

  static get unauthorized() {
    return unauthorized;
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

    this.ref = this;
    this.className = Box.className;
    this.name = Box.className;
    this.next = undefined;
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
    this.doBeforeAddChild = {};
    this.isMinimized = false;
  }

  initState() {
    this.state.color = new Color(255, 255, 255);
    this.state.scale = {x: 1, y: 1};
  }

  doBeforeSetChildren(children) {
    return {children};
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

  beforeAddChild(child) {
    const functionToCall = getFunctionClass(child, this.doBeforeAddChild);

    console.log(functionToCall);

    if(functionToCall instanceof Function) {
      return functionToCall(child);
    } else {
      return child;
    }
  }

  addChild(child) {
    if(!child) return;
    let obj = new child(); //tricky
    if(obj instanceof Box && this.isAuthorized(child)) {
      this.setChildren([{type:this.beforeAddChild(child), id:Box.id}]);
    }
  }

  pushChild(child) {
    if(!child || !child.type || !child.id) return;
    let obj = new child.type(); //tricky
    if(this.isAuthorized(child.type) && obj instanceof Box) {
      this.setChildren([child]);
    }
  }

  setChildren(children) {
    this.setState(this.doBeforeSetChildren(children));
  }

  isAuthorized(cl) {
    const unauthorized = this.constructor.unauthorized;
    return window.isAuthorized(cl, unauthorized);
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
      children.push(<child.type key={child.id} parent={this} id={child.id} ref={el => {this.next = el ? el.ref : null;}} saveState={(state) => {child.state = state}} state={child.state}/>);
    }
    return children;
  }

  renderBox() {
    return null;
  }

  getTransforms() {
    let Transforms = new Array();
    Transforms.push(<Scale key={0} onChange={(scale) => {this.setState({scale: scale});}}/>);
    return Transforms;
  }

  componentDidUpdate() {
    const {saveState} = this.props;
    if(saveState) {
      saveState(this.state);
    }
  }

  render() {
    let c = this.state.color;
    let isNotBlack = (c.r+c.g+c.b !== 0);
    let formatedColor = "rgba("+c.r+", "+c.g+", "+c.b+", "+c.a/255+")";
    let formatedTextColor = (isNotBlack) ? formatedColor : "rgba(255, 255, 255, 1)";
    let formatedBackgroundColor = (isNotBlack) ? "rgba(0, 0, 0, 1)" : "rgba(255, 255, 255, 1)" ;

    const boxContentStyle = this.isMinimized ? {display: 'none'} : {};

    return (
      <div className={this.className} style={this.state.style}>
        <ContextMenuBox id={this.constructor.className + this.props.id} unauthorized={this.constructor.unauthorized} suppMenu={this.suppMenu} el={this}>
          <DragBox icon={this.constructor.icon} color={formatedColor} textColor={formatedTextColor} backgroundColor={formatedBackgroundColor} name={this.constructor.className} onClose={this.removeFromParent.bind(this)} onMinimize={() => this.isMinimized = !this.isMinimized} el={this}>
            <span className="Box__content" style={boxContentStyle}>
              <ContextMenuTrigger id={""}>
                {this.renderBox()}
                {this.getTransforms()}
              </ContextMenuTrigger>
              <DropBox el={this}>
                <ContextMenuTrigger id={this.constructor.className + this.props.id} holdToDisplay={-1}>
                  {this.constructor.unauthorized.indexOf("*") === -1 && <div className="Box__container">
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

export default Box;
