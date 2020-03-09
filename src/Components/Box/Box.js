import React, { Component } from 'react';
import './Box.css';
import ContextMenuBox from '../ContextMenuBox/ContextMenuBox';
import { ContextMenuTrigger } from "react-contextmenu";
import Color from '../Colors/Color';
import DragManager from '../../DragManager';

//import Icons
import SVG from 'react-svg';
import cancel from '../../Icons/cancel.svg';
import minimize from '../../Icons/minimize.svg';
import info from '../../Icons/info.svg';

// Constant Contextual Menu
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
            type: 'Zero',
            name: 'Zero'
          },
          {
            type: 'One',
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


// Constant Color Menu
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

// Constant unauthorized box as child
const unauthorized = [];

/**
 * Returns a callback function depends on the class of the box
 * @param {Box} child - The child of the box 
 * @param {Object} object - The object containing the callback as {boxClassname: callback}
 */
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

/**
 * Class basis for all Box
 */
class Box extends Component {

  /**
   * Get the id of the box
   * @return {number} the id of the box
   */
  static get id() {
    return Box._id++;
  }

  /**
   * get the className of the class
   * @return {string} the name of the class
   */
  static get className() {
    return className;
  }

  /**
   * get the class icon
   * @return {*} Icon of the class
   */
  static get icon() {
    return undefined;
  }

  /**
   * get the unauthorized box for the class
   * @return {string[]} array - names of the unauthorized box class
   */
  static get unauthorized() {
    return unauthorized;
  }

  // STATE
  state = {
    children: [],
    style: {},
    dragEnter: -1,
    isMinimized: false,
    isInfo: false,
    transforms: {}
  };

  /**
   * Create the Box
   * @param {*} props - React props
   */
  constructor(props) {
    super(props);

    // Check if there are saved datas
    if(props && this.props.state) {
      this.state = this.props.state;
      this.initStateFromSavedState();
    } else {
      this.initState();
    }

    // For allowing ThisBox only in Recursion box
    this.parentsList = this.props ? {...this.props.parentsList, [this.constructor.className]: true} : {[this.constructor.className]: true};
    
    this.ref = this;
    
    // For transforms inputs
    this.transforms = {};

    // Dunno why
    this.className = Box.className;
    
    // object containing callback for each box type. To be called before drawing
    this.drawBeforeType = {};

    // init Contextual Menu
    this.reloadMenu();
    
    // for supplementary menu
    this.suppMenu = [];

    // object containing callback for each box type. To be called before adding child
    this.doBeforeAddChild = {};

    // if the dragging is done vertically
    this.isFlexVertical = true;

    // Last dragged in Element
    this.lastEnter = null;

    // Refs
    this.content = React.createRef();
    this.dropbox = React.createRef();
    this.container = React.createRef();

    // Dimensions of the content of the box
    this.contentRect = {height: 0, width: 0};

    // This box has info ?
    this.hasInfo = false;

    // This box can minimize ?
    this.canMinimize = true;
  }

  /**
   * Init the state from saved data
   */
  initStateFromSavedState() {
    const {r, g, b, a} = this.state.color;
    this.state.color = new Color(r, g, b, a);
    this.state = Box.checkChildrenFromSavedState(this.state);
  }

  /**
   * Check if the box has parent from classname
   * @param {string} className - classname of the parent 
   */
  hasParent(className) {
    return this.parentsList[className];
  }

  /**
   * Init children state from saved state
   * @param {*} state - saved state
   */
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

  /**
   * Filter the unauthorized box for Contextual Menu
   * @param {*} menu - Menu to filter
   */
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

  /**
   * Reload the contextual menu object
   */
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

  /**
   * Init the state
   */
  initState() {
    this.state.color = new Color(255, 255, 255);
    this.state.scale = {x: 1, y: 1};
  }

  /**
   * Called before set children
   * TO OVERRIDE
   * @param {*} children 
   * @return {Object} Object containing modified children
   */
  doBeforeSetChildren(children) {
    return {children};
  }

  /**
   * Add a function callback to drawBeforeType
   * @param {string} type - type of the box
   * @param {Function} f - callback function
   * @param {string[]} exceptions - Exceptions for some derived type 
   */
  addDrawBeforeType(type, f, exceptions = []) {
    if(!(f instanceof Function)) return;
    if(!this.drawBeforeType[type]) {
      this.drawBeforeType[type] = [{callback: f, exceptions}];
    } else {
      this.drawBeforeType[type].push({callback: f, exceptions});
    }
  }

  /**
   * Call the function callback in drawBeforeType if type match
   * @param {Paper} sk - Paper object
   * @param {string} type - Type of the box 
   * @param {BoxClass} child - Box Class to check
   */
  callDrawBeforeType(sk, type, child) {
    for(let i = 0; i < this.drawBeforeType[type].length; ++i) {
      const isException = this.drawBeforeType[type][i].exceptions.reduce((acc, exception) => acc || child instanceof window.getClassFromName(exception), false);
      if(isException) {
        continue;
      }
      this.drawBeforeType[type][i].callback(sk);
    }
  }

  /**
   * Call the callback for the BoxClass to add.
   * It can be useful to wrap the BoxClass by another
   * @param {BoxClass} child - BoxClass to add
   * @return {BoxClass} the BoxClass
   */
  beforeAddChild(child) {
    const functionToCall = getFunctionClass(child, this.doBeforeAddChild);

    if(functionToCall instanceof Function) {
      return functionToCall(child);
    } else {
      return child;
    }
  }

  /**
   * Add a child to this box
   * @param {BoxClass} child - BoxClass to add 
   */
  addChild(child) {
    if(!child) return;
    let obj = new child(); //tricky
    if(obj instanceof Box && this.isAuthorized(child)) {
      this.setChildren([{type:this.beforeAddChild(child), id:Box.id}]);
    }
  }

  /**
   * Push a child in the chidren list of this box
   * For a simple Box, the children are the child
   * @param {Box} child - Box Object
   */
  pushChild(child) {
    if(!child || !child.type || !child.id) return;
    let obj = new child.type(); //tricky
    if(this.isAuthorized(child.type) && obj instanceof Box) {
      this.setChildren([child]);
    }
  }

  /**
   * Insert child in the children list of this box
   * If not BoxGroup, the index must be 0
   * @param {Box} child - Box Object
   * @param {int} index - The index of the child
   */
  insertChild(child, index = 0) {
    this.pushChild(child);
  }

  /**
   * Set Children State
   * @param {Box} children - Box Object
   */
  setChildren(children) {
    this.setState(this.doBeforeSetChildren(children));
  }

  /**
   * Check if the Class is authorized in this box
   * @param {Class} cl - BoxClass
   */
  isAuthorized(cl) {
    const unauthorized = this.constructor.unauthorized;
    return window.isAuthorized(cl, unauthorized);
  }

  /**
   * Remove this box from its parent
   */
  removeFromParent() {
    let children = this.props.parent.state.children;
    children = children.filter(el => el.id !== this.props.id);
    this.props.parent.setChildren(children);
    window.updateWorkspace();
  }

  /**
   * Call the callback before drawing the Box
   * @param {Paper} sk - Paper object
   * @param {Box} child - Box to draw
   */
  drawBeforeChild(sk, child) {
    if(!child) return;
    for(let key in this.drawBeforeType) {
      if(child instanceof window.getClassFromName(key)) {
        this.callDrawBeforeType(sk, key, child);
      }
    }
  }

  /**
   * Method to implement for drawing this Box
   * TO OVERRIDE
   * @param {Paper} sk - Paper object (Visitor) 
   */
  draw(sk) {
    // VOID
  }

  /**
   * Get the ReactElement derived from Box and children of this box.
   * @return {ReactElement} the ReactElements obtained from Box
   */
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

  /**
   * Render the special parameters of this box
   * @return {ReactElement} React Element
   */
  renderBox() {
    return null;
  }

  /**
   * Get the JSON data conversion of the class
   * @param {*} constructor - constructor class
   * @param {*} state - state to convert
   * @param {*} id - id of the box
   * @return {Object} JSON data conversion of the class
   */
  static boxToJSON(constructor, state, id = Box.id) {
    return {type: constructor.className, id: id, state: Box.stateToJSON(state)};
  }

  /**
   * Get the JSON data conversion of this box
   * @return JSON data conversion of this box
   */
  toJSON() {
    return this.constructor.boxToJSON(this.constructor, this.state);
  }

  /**
   * Get the JSON data converted from the state
   * @param {State} state - state of the box 
   * @return {Object} the converted state
   */
  static stateToJSON(state) {
    if(state === undefined) return state;
    if(state.children !== undefined && state.children.length > 0) {
      return {...state, children: state.children.map(({type, id, state}) => type.boxToJSON(type, state, id))};
    }
    return {...state};
  }

  /**
   * Get the transform parameters of this box
   * @return {ReactElement} the transform parameters of this box
   */
  getTransforms() {
    return null;
  }

  /**
   * Get the BoxPlaceHolder for drag&drop
   * @return {ReactElement} the BoxPlaceHolder
   */
  getBoxPlaceHolder() {
    const dropboxRect = this.dropbox.current.getBoundingClientRect();
    return <div className="BoxPlaceHolder PlaceHolder" key='ph20' style={{minHeight: dropboxRect.height ? dropboxRect.height : ''}}><p>The Box will replace the content</p></div>;
  }

  /**
   * Get the color menu of this box
   * @return {Menu} the color menu
   */
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

  /**
   * React Method called after update
   */
  componentDidUpdate() {
    const {saveState} = this.props;
    if(saveState) {
      saveState(this.state);
    }
  }

  /**
   * Start Dragging the Box. Convert the box to json for data transmission
   * @param {Event} e - Drag Event
   */
  onDragStart(e) {
    const json = this.toJSON();
    e.dataTransfer.setData(this.constructor.className, JSON.stringify(json));
    e.dataTransfer.effectAllowed = 'move';
    DragManager.instance.draggable = this;
  }

  /**
   * End Dragging the box. If successful, remove the original box from parent
   * @param {Event} e - Drag Event 
   */
  onDragEnd(e) {
    if(e.dataTransfer.dropEffect === 'move') {
      this.removeFromParent();
    }
    //e.dataTransfer.clearData();
    DragManager.instance.clear();
  }

  /**
   * Start Dragging over the box. If the dragged box is authorized, get its placeholder index
   * @param {*} e - Drag Event
   */
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

  /**
   * Called during Dragging the box.
   * @param {*} e - Drag Event
   */
  onDrag(e) {

  }

  /**
   * End Dragging over the box. Reset the PlaceHolder index
   * @param {*} e - Drag Event
   */
  onDragLeave(e) {
    if(e.target === this.lastEnter && this.state.dragEnter >= 0) {
      this.setState({dragEnter: -1});
      this.lastEnter = null;
    }

    e.stopPropagation();
  }

  /**
   * Called during Dragging over the box
   * @param {*} e  - Drag Event
   */
  onDragOver(e) {
    this.onDragEnter(e);
  }

  /**
   * Dropping in this box. Insert the new child inside of it
   * @param {*} e - Drag Event
   */
  onDrop(e) {

    const last = e.dataTransfer.types.length - 1;
    if(last < 0) return false;

    const json = JSON.parse(e.dataTransfer.getData(e.dataTransfer.types[last]));
    this.insertChild({type: window.getClassFromName(json.type), id: json.id, state: json.state}, this.state.dragEnter);
    this.setState({dragEnter: -1}, () => {window.updateWorkspace()});
    e.stopPropagation();
  }

  /**
   * Get Placeholder index from cursor position
   * @param {number} x - cursor x-position
   * @param {number} y - cursor y-position
   * @return {int} the placeholder index 
   */
  getDragItemIndex(x, y) {
    const container = this.container.current;
    let index = 0;
    const dragManager = DragManager.instance;

    let children = Array.from(container.children).filter((child) => {
      const className = child.className.split(' ');
      return className.indexOf("Box") !== -1 || className.indexOf("BoxGroup") !== -1;
    });

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

    // No Placeholder if next to the dragged box
    if(dragManager.draggableParent === this && (index === dragManager.draggableIndex || index - 1 === dragManager.draggableIndex)) {
      index = -1;
    }

    return index;
  }

  /**
   * OnClick Close Event. By default, remove the box from parent
   */
  onClose() {
    this.removeFromParent();
    window.updateWorkspace();
  }

  /**
   * OnClick Minimize Event. By default, minimize the box
   */
  onMinimize() {
    this.setState({isMinimized: !this.state.isMinimized, isInfo: false});
  }

  /**
   * OnClick Info Event. By default, show the informations of this box
   */
  onInfo() {
    this.contentRect = this.content.current ? this.content.current.getBoundingClientRect() : {height: 0, width: 0};
    this.setState({isInfo: !this.state.isInfo});
  }

  /**
   * Get the informations as React Elements of this box
   * @return {ReactElement} React Element
   */
  getInfo() {
    return null;
  }

  /**
   * Method called before render the box
   * TO OVERRIDE
   */
  doBeforeRender() {
    // Void
  }

  /**
   * Check if the maximum children length is reached
   * Actually, there is no maximum for the BoxGroup
   * @return {bool} hasReachedLimit
   */
  hasReachedLimit() {
    return !!this.state.children.length;
  }

  /**
   * React render method
   */
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
            <span ref={this.content} className="Box__content" style={!this.state.isMinimized && !this.state.isInfo ? {} : {display: 'none'}}>
              <ContextMenuTrigger id={""}>
                {box}
                {transforms !== null && <div className='TransformBox'>{transforms}</div>}
              </ContextMenuTrigger>
              <div className='DropBox' ref={this.dropbox}>
                <ContextMenuTrigger id={this.constructor.className + this.props.id} holdToDisplay={-1}>
                  {this.constructor.unauthorized.indexOf("*") === -1 && <div className="Box__container" ref={this.container} onDrop={this.onDrop.bind(this)} onDragEnter={this.onDragEnter.bind(this)} onDragOver={this.onDragOver.bind(this)} onDragLeave={this.onDragLeave.bind(this)}>
                    {children}
                    {!this.hasReachedLimit() && <span className="Box__placeholder">Right click to add</span>}
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
