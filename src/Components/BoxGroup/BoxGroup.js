import React from 'react';
import './BoxGroup.css';
import Box from '../Box/Box';
import ContextMenuBox from '../ContextMenuBox/ContextMenuBox';
import { ContextMenuTrigger } from "react-contextmenu";

const className = "BoxGroup";
const unauthorized = [];

/*Pencil*/
class BoxGroup extends Box {

  static get className() {
    return className;
  }

  static get icon() {
    return undefined;
  }

  static get unauthorized() {
    return [...super.unauthorized, ...unauthorized];
  }

  constructor(props) {
    super(props);
    this.className = BoxGroup.className;
    this.elements = [];
  }

  addChild(child) {

    if(!child) return;
    let obj = new child(); //tricky
    let children = this.state.children;
    if(obj instanceof Box && this.isAuthorized(child)) {
      console.log(this.state);
      this.setChildren([...this.state.children, {type:this.beforeAddChild(child), id:Box.id}]);
    }
  }

  pushChild(child) {
    if(!child || !("type" in child) || !("id" in child)) return;
    let obj = new child.type(); //tricky
    if(this.isAuthorized(child.type) && obj instanceof Box) {
      let children = this.state.children;
      children.push(child);
      this.setChildren(children);
    }
  }

  setChildren(children) {
    this.elements = [];
    super.setChildren(children);
  }

  draw(sk) {
    let el = this.elements;
    for(let i = 0; i < el.length; ++i) {
       let element = el[i];
       sk.push();
         this.drawBeforeChild(sk, element);
         if(element) element.draw(sk);
       sk.pop();
    }
  }

  initElements() {

    let elements = [];

    const children = React.Children.map(this.props.children,
       (child, index) => {
              elements.push(child);
              //box.parent = callback;
    });

  }

  componentDidMount() {
    //this.initElements();
  }

  getChildren() {
    this.elements = [];
    let children = this.state.children.map((child, index) =>
      <child.type key={child.id} id={child.id} parent={this} ref={el => {if(el) this.elements[index] = el.ref;}} saveState={(state) => {child.state = state}} state={child.state}/>
    );

    if(this.state.dragEnter >= 0) {
      children.splice(this.state.dragEnter, 0, this.getBoxPlaceHolder());
    }

    return children;
  }

  insertChild(child, index = 0) {
    if(!child || !("type" in child) || !("id" in child) || index > this.state.children.length) return;
    if(index === this.state.children.length) {
      this.pushChild(child);
      return;
    }
    let obj = new child.type(); //tricky
    if(this.isAuthorized(child.type) && obj instanceof Box) {
      let children = this.state.children;
      children.splice(index, 0, child);
      this.setChildren(children);
    }
  }

  getTransforms() {
    return null;
  }

  renderBox() {
    return null;
  }
}

export default BoxGroup;
