import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './Box.css';
import ContextMenuBox from '../ContextMenuBox/ContextMenuBox';
import { ContextMenuTrigger } from "react-contextmenu";
import Color from '../Colors/Color';
import Scale from '../Transforms/Scale/Scale';
import DragManager from '../../DragManager';
import Paper from 'paper'

//import Icons
import SVG from 'react-svg';
import cancel from '../../Icons/cancel.svg';
import minimize from '../../Icons/minimize.svg';

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
    style: {},
    dragEnter: -1
  };

  constructor(props) {
    super(props);

    if(props && this.props.state) {
      this.state = this.props.state;
      this.initStateFromSavedState();
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
    this.isFlexVertical = true;
    this.lastEnter = null;
  }

  initStateFromSavedState() {
    const {r, g, b, a} = this.state.color;
    this.state.color = new Color(r, g, b, a);
    this.state = Box.checkChildrenFromSavedState(this.state);
  }

  static checkChildrenFromSavedState(state) {
    if(state === undefined) return state;
    if(state.children !== undefined && state.children.length > 0) {
      return {
        ...state,
        children: state.children.map(({type, id, state}) => {
          if(typeof type === 'string') {
            return {type: window.getClassFromName(type), id, state: Box.checkChildrenFromSavedState(state)};
          } else {
            return {type, id, state};
          }
        })
      }
    }
    return {...state};
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

  insertChild(child, index = 0) {
    this.pushChild(child);
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
      style: {...this.state.style, ...style}
    });
  }

  drawBeforeChild(sk, child) {
    if(!child) return;
    for(let key in this.drawBeforeType) {
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

    if(this.state.dragEnter >= 0) {
      children.splice(this.state.dragEnter, 0, this.getBoxPlaceHolder());
    }

    return children;
  }

  renderBox() {
    return null;
  }

  static boxToJSON(constructor, state, id = Box.id) {
    return {type: constructor.className, id: id, state: Box.stateToJSON(state)};
  }

  toJSON() {
    return this.constructor.boxToJSON(this.constructor, this.state);
  }

  static stateToJSON(state) {
    if(state === undefined) return state;
    if(state.children !== undefined && state.children.length > 0) {
      return {...state, children: state.children.map(({type, id, state}) => type.boxToJSON(type, state, id))};
    }
    return {...state};
  }

  getTransforms() {
    let Transforms = new Array();
    Transforms.push(<Scale key={0} onChange={(scale) => {this.setState({scale: scale});}}/>);
    return Transforms;
  }

  getBoxPlaceHolder() {
    return <div className="BoxPlaceHolder" key='ph20'><p>The Box will appear here</p></div>;
  }

  componentDidUpdate() {
    const {saveState} = this.props;
    if(saveState) {
      saveState(this.state);
    }
  }

  onDragStart(e) {
    const json = this.toJSON();
    e.dataTransfer.setData(this.constructor.className, JSON.stringify(json));
    e.dataTransfer.effectAllowed = 'move';
    DragManager.instance.draggable = this;
  }

  onDragEnd(e) {
    if(e.dataTransfer.dropEffect === 'move') {
      this.removeFromParent();
    }
    e.dataTransfer.clearData();
    DragManager.instance.clear();
  }

  onDragEnter(e) {
    const last = e.dataTransfer.types.length - 1;
    if(last >= 0 && this.isAuthorized(e.dataTransfer.types[last])) {
      e.preventDefault();
      e.dataTransfer.dropEffect = "move";
      const index = this.getDragItemIndex(e.screenX, e.screenY);
      if(index !== this.state.dragEnter) {
        this.setState({dragEnter: index});
      }
      this.lastEnter = e.target;
      DragManager.instance.addDroppable(this);
    } else {
      e.dataTransfer.dropEffect = "none";
    }
    e.stopPropagation();
  }

  onDrag(e) {

  }

  onDragLeave(e) {
    if(e.target === this.lastEnter && this.state.dragEnter >= 0) {
      this.setState({dragEnter: -1});
      this.lastEnter = null;
    }

    e.stopPropagation();
  }

  onDragOver(e) {
    this.onDragEnter(e);
  }

  onDrop(e) {

    const last = e.dataTransfer.types.length - 1;
    if(last < 0) return false;

    const json = JSON.parse(e.dataTransfer.getData(e.dataTransfer.types[last]));
    this.insertChild({type: window.getClassFromName(json.type), id: json.id, state: json.state}, this.state.dragEnter);
    this.setState({dragEnter: -1});
    e.stopPropagation();
  }

  getDragItemIndex(x, y) {
    const container = ReactDOM.findDOMNode(this.refs.container);
    let index = 0;
    const dragManager = DragManager.instance;

    let children = Array.from(container.children).filter((child) => child.className !== 'BoxPlaceHolder');

    for(let child of children) {
      if(child.nodeType === 1) {
        const box = child.getBoundingClientRect();
        const isx = ( x < ( box.left + box.width / 2 ) );
        const isy = ( y < ( box.top + box.height ) );
        if((!this.isFlexVertical && isx) || (this.isFlexVertical && isy)) {
          break;
        }
        index++;
      }
    }

    if(dragManager.draggableParent === this && index === dragManager.draggableIndex) {
      index = (index + 1) % children.length;
    }

    return index;
  }

  onClose() {
    this.removeFromParent();
    window.updateWorkspace();
  }

  onMinimize() {
    this.isMinimized = !this.isMinimized
    window.updateWorkspace();
  }

  render() {
    let c = this.state.color;
    let isNotBlack = (c.r+c.g+c.b !== 0);
    let formatedColor = "rgba("+c.r+", "+c.g+", "+c.b+", "+c.a/255+")";
    let formatedTextColor = (isNotBlack) ? formatedColor : "rgba(255, 255, 255, 1)";
    let formatedBackgroundColor = (isNotBlack) ? "rgba(0, 0, 0, 1)" : "rgba(255, 255, 255, 1)" ;

    const boxContentStyle = this.isMinimized ? {display: 'none'} : {};

    const icon = this.constructor.icon;

    const children = this.getChildren();

    return (
      <div className={this.className} style={this.state.style} ref='box'>
        <ContextMenuBox id={this.constructor.className + this.props.id} unauthorized={this.constructor.unauthorized} suppMenu={this.suppMenu} el={this}>
          <div className="Box__wrapper">
            <div className="Box_titleOptions">
              <span className="Box__titleOption" onClick={this.onMinimize.bind(this)}>
                  <SVG src={minimize}/>
              </span>
              <span className="Box__titleOption" onClick={this.onClose.bind(this)}>
                  <SVG src={cancel}/>
              </span>
            </div>
            <span draggable="true" className="Box__title" onDragStart={this.onDragStart.bind(this)} onDragEnd={this.onDragEnd.bind(this)} onDrag={this.onDrag.bind(this)}>
              {icon && <SVG className="Box__titleIcon" src={icon} style={{fill: formatedColor, backgroundColor: formatedBackgroundColor}}/>}
              <span className="Box__titleText" style={{color: formatedTextColor}}>{this.constructor.className}</span>
            </span>
            <span className="Box__content" style={boxContentStyle}>
              <ContextMenuTrigger id={""}>
                {this.renderBox()}
                {this.getTransforms()}
              </ContextMenuTrigger>
              <div className='DropBox'>
                <ContextMenuTrigger id={this.constructor.className + this.props.id} holdToDisplay={-1}>
                  {this.constructor.unauthorized.indexOf("*") === -1 && <div className="Box__container" ref='container' onDrop={this.onDrop.bind(this)} onDragEnter={this.onDragEnter.bind(this)} onDragOver={this.onDragOver.bind(this)} onDragLeave={this.onDragLeave.bind(this)}>
                    {!children.length && <span className="Box__placeholder">Right click to add</span>}
                    {children}
                  </div>}
                </ContextMenuTrigger>
              </div>
            </span>
          </div>
        </ContextMenuBox>
      </div>
    );
  }
}

Box._id = 0; //or use shortid ?

export default Box;
