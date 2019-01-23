import React, { Component } from 'react';
import './Box.css';
import p5 from 'p5';
import DragBox from '../DragBox/DragBox';
import ContextMenuBox from '../ContextMenuBox/ContextMenuBox';

/*Pencil*/
class Box extends Component {


  state = {};

  constructor(props) {
    super(props);
    this.className = Box.name;
    this.next = undefined;
    this.nextType = undefined;
    this.unauthorized = [];
  }

  addNext(elmnt) {
    if(elmnt !== undefined) {
      if(elmnt instanceof Box) {
        this.next = elmnt;
        this.nextType = elmnt.constructor.name;
      }
    }
  }


  draw(sk) {

  }

  boxWrapper() {
    let Component = (props) => {
      return (
        <ContextMenuBox id={this.constructor.name} unauthorized={this.unauthorized}>
          <DragBox name={this.constructor.name} className={this.className}>
            {props.children}
          </DragBox>
        </ContextMenuBox>
      );
    };

    return Component;
  }

  render() {

    const BoxWrapper = this.boxWrapper();

    return (
      <BoxWrapper>
        {this.props.children}
      </BoxWrapper>
    );
  }
}

export default Box;
