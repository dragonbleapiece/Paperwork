import React, { Component } from 'react';
import './BoxGroup.css';
import Box from '../Box/Box';
import p5 from 'p5';

/*Pencil*/
class BoxGroup extends Box {

  constructor(props) {
    super(props);
    this.className = BoxGroup.name;
    this.elements = [];
  }

  addElement(elmnt) {
    if(elmnt instanceof Box) {
      this.elements.push(elmnt);
    }
  }

  draw(sk) {
    for(let i = 0; i < this.elements.length; ++i) {
       let element = this.elements[i];
       element.draw(sk);
    }
  }

  initElements(instance = Box) {
    this.elements = [];
    const children = React.Children.map(this.props.children,
       (child, index) => React.cloneElement(child, {
         ref : box => {if(box instanceof instance) this.addElement(box)}
       })
    );
    return children;
  }

  render() {
    return (
      <div className={this.className}>
        <span>{this.constructor.name}</span>
        {this.initElements()}
      </div>
    );
  }
}

export default BoxGroup;
