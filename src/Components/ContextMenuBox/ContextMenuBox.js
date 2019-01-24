import React, { Component } from 'react';
import './ContextMenuBox.css';
import { ContextMenu, MenuItem, SubMenu, ContextMenuTrigger } from "react-contextmenu";

//import Icons
import SVG from 'react-svg';
import grid_on from '../../Icons/grid_on.svg';

const menu = [
  {
    type: 'Figure',
    elements: [
      {type: 'Rectangle'},
      {type: 'Triangle'},
      {type: 'Ellipse'}
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
    type: 'Distribution',
    icon: grid_on,
      elements: [
        {type: 'Grid',
         icon: grid_on}
      ]
  },
  {
    type: 'Transform',
    elements: [
      {type: 'Translate'}
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
      window.addClassToElement(data.type, data.el);
    }
  }

  render() {
    let menuItems = menu.map(
      (item, index) => {
        if (!item.elements) {
          return (<MenuItem onClick={this.handleClick} data={{ type: item.type, el: this.props.el }} key={index}>
            {item.icon && <span className="react-contextmenu-itemIcon"><SVG src={item.icon}/></span>}
            <span className="react-contextmenu-itemText">{item.type}</span>
          </MenuItem>);
        } else {
          return (<SubMenu title={
            <>{item.icon && <span className="react-contextmenu-itemIcon"><SVG src={item.icon}/></span>}
            <span className="react-contextmenu-itemText">{item.type}</span></>
          }>
              {item.elements.map(
                (subItem, index) =>
                  <MenuItem onClick={this.handleClick} data={{ type: subItem.type, el: this.props.el }} key={index}>
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
