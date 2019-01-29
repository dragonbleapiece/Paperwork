import React, { Component } from 'react';
import './ContextMenuBox.css';
import { ContextMenu, MenuItem, SubMenu, ContextMenuTrigger } from "react-contextmenu";

//import Icons
import SVG from 'react-svg';
import arrow_right from '../../Icons/arrow_right.svg';

const menu = [
  {
    type: 'Placement',
    elements: [
      {type: 'Grid'}
    ]
  },
  {
    type: 'Elements',
    elements: [
      {type: 'Rectangle'},
      {type: 'Triangle'},
      {type: 'Ellipse'}
    ]
  },
  {
    type: 'Color',
    elements: [
      {type: 'Blue'},
      {type: 'Cyan'},
      {type: 'Magenta'},
      {type: 'Yellow'}
    ]
  },
  {
    type: 'Markov'
  },
  {
    type: 'Transform',
    elements: [
      {type: 'Translate'},
      {type: 'Rotate'}
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
    }
  }

  render() {

    if(this.props.el.unauthorized.indexOf("*") !== -1) {
      return (
        <ContextMenuTrigger id={this.props.id} holdToDisplay={-1}>
            {this.props.children}
        </ContextMenuTrigger>
      );
    }

    let menuItems = menu.map(
      (item, index) => {
        if(this.props.el.unauthorized.indexOf(item.type) === -1) {
          let icon = window.getIconClassFromName(item.type);
          if (!item.elements) {
            return (<MenuItem onClick={this.handleClick} data={{ type: item.type, el: this.props.el }} key={index}>
              {icon && <span className="react-contextmenu-itemIcon"><SVG src={icon}/></span>}
              <span className="react-contextmenu-itemText">{item.type}</span>
            </MenuItem>);
          } else {
            return (<SubMenu key={index} title={
              <>
                <span  className="react-contextmenu-itemLabel">
                {icon && <span className="react-contextmenu-itemIcon"><SVG src={icon}/></span>}
                <span className="react-contextmenu-itemText">{item.type}</span>
                </span>
                <span className="react-contextmenu-itemIcon"><SVG src={arrow_right}/></span>
              </>
            }>
                {item.elements.map(
                  (subItem, index) => {
                    let subIcon = window.getIconClassFromName(subItem.type);
                    return (
                      <MenuItem onClick={this.handleClick} data={{ type: subItem.type, el: this.props.el, icon: subItem.icon }} key={index}>
                        {subIcon && <span className="react-contextmenu-itemIcon"><SVG src={subIcon}/></span>}
                        <span className="react-contextmenu-itemText">{subItem.type}</span>
                      </MenuItem>
                    );
                  }

                )}
            </SubMenu>);
          }
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
