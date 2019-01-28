import React, { Component } from 'react';
import './ContextMenuBox.css';
import { ContextMenu, MenuItem, SubMenu, ContextMenuTrigger } from "react-contextmenu";

//import Icons
import SVG from 'react-svg';
import arrow_right from '../../Icons/arrow_right.svg';

import grid_on from '../../Icons/grid_on.svg';
import square from '../../Icons/square.svg';
import triangle from '../../Icons/triangle.svg';
import ellipse from '../../Icons/ellipse.svg';

import translate from '../../Icons/translate.svg';
import rotate from '../../Icons/rotate.svg';

function test() {
  console.log("test");
}

const menu = [
  {
    type: 'Placement',
    elements: [
      {type: 'Grid',
      icon: grid_on}
    ]
  },
  {
    type: 'Elements',
    elements: [
      {type: 'Rectangle',
      icon: square},
      {type: 'Triangle',
      icon: triangle},
      {type: 'Ellipse',
      icon: ellipse}
    ]
  },
  {
    type: 'Color',
    elements: [
      {type: 'Red'},
      {type: 'Blue'},
      {type: 'Green'}
    ]
  },
  {
    type: 'Markov'
  },
  {
    type: 'Transform',
    elements: [
      {type: 'Translate',
      icon: translate},
      {type: 'Rotate',
      icon: rotate}
    ]
  }
];

class ContextMenuBox extends Component {
  state = {};

  constructor(props) {
    super(props);

  }

  handleClick(event, data) {
    if(data.type !== undefined) {
      console.log(data.el);
      window.addClassToElement(data.type, data.el);
      data.el.addIcon(data.icon);
    }
  }

  render() {
    let menuItems = menu.map(
      (item, index) => {
        if (!item.elements) {
          return (<MenuItem onClick={this.handleClick} data={{ type: item.type, el: this.props.el, icon: item.icon }} key={index}>
            {item.icon && <span className="react-contextmenu-itemIcon"><SVG src={item.icon}/></span>}
            <span className="react-contextmenu-itemText">{item.type}</span>
          </MenuItem>);
        } else {
          return (<SubMenu key={index} title={
            <><span  className="react-contextmenu-itemLabel">
              {item.icon && <span className="react-contextmenu-itemIcon"><SVG src={item.icon}/></span>}
              <span className="react-contextmenu-itemText">{item.type}</span>
            </span>
            <span className="react-contextmenu-itemIcon"><SVG src={arrow_right}/></span>
            </>
          }>
              {item.elements.map(
                (subItem, index) =>
                  <MenuItem onClick={this.handleClick} data={{ type: subItem.type, el: this.props.el, icon: subItem.icon }} key={index}>
                    {subItem.icon && <span className="react-contextmenu-itemIcon"><SVG src={subItem.icon}/></span>}
                    <span className="react-contextmenu-itemText">{subItem.type}</span>
                  </MenuItem>

              )}
          </SubMenu>);
        }
      }
    );

    return (
      <>
        <ContextMenuTrigger id={this.props.id} holdToDisplay={-1}>
            {this.props.children}
        </ContextMenuTrigger>
        <ContextMenu id={this.props.id}>
            {menuItems}
        </ContextMenu>
      </>
    );
  }
}

export default ContextMenuBox;
