import React, { Component } from 'react';
import './ContextMenuBox.css';
import { ContextMenu, MenuItem, SubMenu, ContextMenuTrigger } from "react-contextmenu";
import shortid from 'shortid';

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
      {type: 'Ellipse'},
      {type: 'HHatching'},
      {type: 'VHatching'},
      {type: 'LOHatching'},
      {type: 'ROHatching'},
      {type: 'Void'}
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
      {type: 'Rotate'},
      {type: 'Scale'}
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

  getMenu(m, handleClick) {
    return m.map(
      (item, index) => {
        if(this.props.el.unauthorized.indexOf(item.type) === -1) {
          let icon = window.getIconClassFromName(item.type);
          if (!item.elements) {
            return (<MenuItem onClick={handleClick} data={{ type: item.type, el: this.props.el }} key={shortid.generate()}>
              {icon && <span className="react-contextmenu-itemIcon"><SVG src={icon}/></span>}
              <span className="react-contextmenu-itemText">{item.type}</span>
            </MenuItem>);
          } else {
            return (<SubMenu key={shortid.generate()} title={
              <>
                <span  className="react-contextmenu-itemLabel">
                {icon && <span className="react-contextmenu-itemIcon"><SVG src={icon}/></span>}
                <span className="react-contextmenu-itemText">{item.type}</span>
                </span>
                <span className="react-contextmenu-itemIcon"><SVG src={arrow_right}/></span>
              </>
            }>
                {this.getMenu(item.elements, handleClick)}
            </SubMenu>);
          }
        }
      }
    );
  }

  render() {

    if(this.props.el.unauthorized.indexOf("*") !== -1) {
      return (
        <ContextMenuTrigger id={this.props.id} holdToDisplay={-1}>
            {this.props.children}
        </ContextMenuTrigger>
      );
    }

    let menuItems = this.getMenu(menu, this.handleClick.bind(this));
    if(this.props.suppMenu && this.props.suppMenu.menu && this.props.suppMenu.handleClick) {
      menuItems = menuItems.concat(this.getMenu(this.props.suppMenu.menu, this.props.suppMenu.handleClick));
    }

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
