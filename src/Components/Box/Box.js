import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './Box.css';
import ContextMenuBox from '../ContextMenuBox/ContextMenuBox';
import { ContextMenuTrigger } from "react-contextmenu";
import Color from '../Colors/Color';
import DragManager from '../../DragManager';
import Paper from 'paper'

//import Icons
import SVG from 'react-svg';
import cancel from '../../Icons/cancel.svg';
import minimize from '../../Icons/minimize.svg';
import info from '../../Icons/info.svg';

const menu = [
  {
    type: 'Placement',
    elements: [
      {
        type: 'Grid'
      }
    ]
  },
  {
    type: 'Elements',
    elements: [
      {
        name: 'Basic Shapes',
        type: 'Rectangle',
        elements: [
          {
            type: 'Rectangle'
          },
          {
            type: 'Triangle'
          },
          {
            type: 'Ellipse'
          }
        ]
      },
      {
        type: 'HHatching',
        name: 'Hatching',
        elements: [
          {
            type: 'HHatching',
            name: 'Horizontal'
          },
          {
            type: 'VHatching',
            name: 'Vertical'
          },
          {
            type: 'LOHatching',
            name: 'Left Oblique'
          },
          {
            type: 'ROHatching',
            name: 'Right Oblique'
          }
        ]
      },
      {
        name: 'Characters',
        type: 'Character',
        elements: [
          {
            type: '0',
            name: 'Zero'
          },
          {
            type: '1',
            name: 'One'
          }
        ]
      },
      {
        type: 'Arrow'
      },
      {
        type: 'Void'
      }
    ]
  },
  {
    type: 'Markov'
  },
  {
    type: 'Recursion'
  }
];

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
    dragEnter: -1,
    isMinimized: false,
    isInfo: false
  };

  constructor(props) {
    super(props);

    if(props && this.props.state) {
      this.state = this.props.state;
      this.initStateFromSavedState();
    } else {
      this.initState();
    }

    this.parentsList = this.props ? {...this.props.parentsList, [this.constructor.className]: true} : {[this.constructor.className]: true};
    this.ref = this;
    this.transforms = {};
    this.className = Box.className;
    this.drawBeforeType = {};
    this.reloadMenu();
    
    this.suppMenu = [];
    this.doBeforeAddChild = {};
    this.isFlexVertical = true;
    this.lastEnter = null;
    this.contentRect = {width: 0, height: 0};
    this.hasInfo = false;
    this.canMinimize = true;
  }

  initStateFromSavedState() {
    const {r, g, b, a} = this.state.color;
    this.state.color = new Color(r, g, b, a);
    this.state = Box.checkChildrenFromSavedState(this.state);
  }

  hasParent(className) {
    return this.parentsList[className];
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

  filterUnauthorized(menu) {
    if(this.constructor.unauthorized.indexOf('*') !== -1) {
      return [];
    }
    const filteredMenu = menu.filter((item) => this.constructor.unauthorized.indexOf(item.type) === -1);
    if(this.hasParent('Recursion')) {
      return [...filteredMenu, {type: 'ThisBox'}];
    }
    return filteredMenu;
  }

  reloadMenu() {
    this.menu = [
      {
        menu: this.filterUnauthorized(menu),
        handleClick: (event, data) =>  {
          if(data.type !== undefined) {
            window.addClassToElement(data.type, this);
          }
        }
      }
    ];
  }

  initState() {
    this.state.color = new Color(255, 255, 255);
    this.state.scale = {x: 1, y: 1};
  }

  doBeforeSetChildren(children) {
    return {children};
  }

  addDrawBeforeType(type, f, exceptions = []) {
    if(!(f instanceof Function)) return;
    if(!this.drawBeforeType[type]) {
      this.drawBeforeType[type] = [{callback: f, exceptions}];
    } else {
      this.drawBeforeType[type].push({callback: f, exceptions});
    }
  }

  callDrawBeforeType(sk, type, child) {
    for(let i = 0; i < this.drawBeforeType[type].length; ++i) {
      const isException = this.drawBeforeType[type][i].exceptions.reduce((acc, exception) => acc || child instanceof window.getClassFromName(exception), false);
      if(isException) {
        continue;
      }
      this.drawBeforeType[type][i].callback(sk);
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
    window.updateWorkspace();
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
        this.callDrawBeforeType(sk, key, child);
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
      children.push(<child.type key={child.id} parentsList={this.parentsList} parent={this} id={child.id} ref={el => {this.next = el ? el.ref : null;}} saveState={(state) => {child.state = state}} state={child.state}/>);
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
    return null;
  }

  getBoxPlaceHolder() {
    return <div className="BoxPlaceHolder" key='ph20'><p>The Box will appear here</p></div>;
  }

  getColorMenu() {
    const colorMenu = [
      {
        menu: menuColor,
        handleClick: (event, data) => {
          if(data.type) {
            let color = window.getClassFromName(data.type);
            if(color) this.setState({color: new color()});
            window.updateWorkspace();
          }
        }
      }
    ];

    return colorMenu;
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
    this.setState({isMinimized: !this.state.isMinimized, isInfo: false});
  }

  onInfo() {
    this.setState({isInfo: !this.state.isInfo});
    if(this.refs.content) {
      this.contentRect = this.refs.content.getBoundingClientRect();
    }
  }

  getInfo() {
    return null;
  }

  doBeforeRender() {
    // Void
  }

  render() {
    let c = this.state.color;
    let isNotBlack = (c.r+c.g+c.b !== 0);
    let formatedColor = "rgba("+c.r+", "+c.g+", "+c.b+", "+c.a/255+")";
    let formatedTextColor = (isNotBlack) ? formatedColor : "rgba(255, 255, 255, 1)";
    let formatedBackgroundColor = (isNotBlack) ? "rgba(0, 0, 0, 1)" : "rgba(255, 255, 255, 1)" ;

    const icon = this.constructor.icon;

    const children = this.getChildren();
    const transforms = this.getTransforms();
    const box = this.renderBox();
    const infoBox = this.getInfo();

    this.doBeforeRender();

    return (
      <div className={this.className} style={this.state.style} ref='box'>
        <ContextMenuBox id={this.constructor.className + this.props.id} menu={[...this.menu, ...this.getColorMenu(), ...this.suppMenu]}>
          <div className="Box__wrapper">
            <div className="Box_titleOptions">
              {this.hasInfo && !this.state.isMinimized && <span className="Box__titleOption" onClick={this.onInfo.bind(this)}>
                <SVG src={info}/>
              </span>}
              {this.canMinimize && <span className="Box__titleOption" onClick={this.onMinimize.bind(this)}>
                  <SVG src={minimize}/>
              </span>}
              <span className="Box__titleOption" onClick={this.onClose.bind(this)}>
                  <SVG src={cancel}/>
              </span>
            </div>
            <span draggable="true" className="Box__title" onDragStart={this.onDragStart.bind(this)} onDragEnd={this.onDragEnd.bind(this)} onDrag={this.onDrag.bind(this)}>
              {icon && <SVG className="Box__titleIcon" src={icon} style={{fill: formatedColor, backgroundColor: formatedBackgroundColor}}/>}
              <span className="Box__titleText" style={{color: formatedTextColor}}>{this.constructor.className}</span>
            </span>
            {this.state.isInfo && <div className="Box__info" style={{minHeight: this.contentRect.height ? this.contentRect.height : '', maxWidth: this.contentRect.width ? this.contentRect.width : ''}}>{infoBox}</div>}
            {!this.state.isMinimized && !this.state.isInfo && <span ref='content' className="Box__content">
              <ContextMenuTrigger id={""}>
                {box}
                {transforms !== null && <div className='TransformBox'>{transforms}</div>}
              </ContextMenuTrigger>
              <div className='DropBox'>
                <ContextMenuTrigger id={this.constructor.className + this.props.id} holdToDisplay={-1}>
                  {this.constructor.unauthorized.indexOf("*") === -1 && <div className="Box__container" ref='container' onDrop={this.onDrop.bind(this)} onDragEnter={this.onDragEnter.bind(this)} onDragOver={this.onDragOver.bind(this)} onDragLeave={this.onDragLeave.bind(this)}>
                    {!children.length && <span className="Box__placeholder">Right click to add</span>}
                    {children}
                  </div>}
                </ContextMenuTrigger>
              </div>
            </span>}
          </div>
        </ContextMenuBox>
      </div>
    );
  }
}

Box._id = 0; //or use shortid ?

export default Box;
