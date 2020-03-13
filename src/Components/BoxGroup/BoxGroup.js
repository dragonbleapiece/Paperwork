import React from 'react';
import './BoxGroup.css';
import Box from '../Box/Box';

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
      this.setChildren([...this.state.children, {type:this.beforeAddChild(child), id:Box.id}]);
    }
  }

  getBoxPlaceHolder() {
    return <div className="PlaceHolder" key='ph20'><p>The Box will appear here</p></div>;
  }

  pushChild(child) {
    if(!child || !("type" in child) || !("id" in child)) return;
    let obj = new child.type(); //tricky
    if(this.isAuthorized(child.type) && obj instanceof Box) {
      const children = this.state.children;
      this.setChildren([...children, child]);
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

  getChildren() {
    this.elements = [];
    let children = this.state.children.map((child, index) =>
      <child.type key={child.id} id={child.id} parentsList={this.parentsList} parent={this} ref={el => {if(el) this.elements[index] = el.ref;}} saveState={(state) => {child.state = state}} state={child.state}/>
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

  hasReachedLimit() {
    return false;
  }

  getTransforms() {
    return null;
  }

  renderBox() {
    return null;
  }
}

export default BoxGroup;
