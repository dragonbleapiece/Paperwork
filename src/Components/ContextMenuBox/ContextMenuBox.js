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
    type: 'Markov'
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

    let menuItems = [];
    if(this.props.el.unauthorized.indexOf("*") === -1) {
      menuItems = this.getMenu(menu, this.handleClick.bind(this));
    }

    for(let key in this.props.suppMenu) {
      let suppMenu = this.props.suppMenu[key];
      if( suppMenu.menu && suppMenu.handleClick ) {
        menuItems = menuItems.concat(this.getMenu(suppMenu.menu, suppMenu.handleClick));
      }
    }

    if(menuItems.length > 0) {
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
    } else {
      return (
        <ContextMenuTrigger id={this.props.id} holdToDisplay={-1}>
            {this.props.children}
        </ContextMenuTrigger>
      );
    }


  }
}

export default ContextMenuBox;
