import React, { Component } from 'react';
import './ContextMenuBox.css';
import { ContextMenu, MenuItem, SubMenu, ContextMenuTrigger } from "react-contextmenu";
import shortid from 'shortid';

//import Icons
import SVG from 'react-svg';
import arrow_right from '../../Icons/arrow_rightUI.svg';



class ContextMenuBox extends Component {
  state = {};

  getMenu(m, handleClick) {
    return m.map(
      (item, index) => {
        let icon = window.getIconClassFromName(item.type);
        if (item.elements === undefined || item.elements.length === 0) {
          return (<MenuItem onClick={handleClick} data={{ type: item.type}} key={shortid.generate()}>
            {icon && <span className="react-contextmenu-itemIcon"><SVG src={icon}/></span>}
            <span className="react-contextmenu-itemText">{item.name ? item.name : item.type}</span>
          </MenuItem>);
        } else {
          return (<SubMenu key={shortid.generate()} title={
            <>
              <span  className="react-contextmenu-itemLabel">
              {icon && <span className="react-contextmenu-itemIcon"><SVG src={icon}/></span>}
              <span className="react-contextmenu-itemText">{item.name ? item.name : item.type}</span>
              </span>
              <span className="react-contextmenu-itemIcon"><SVG src={arrow_right}/></span>
            </>
          }>
              {this.getMenu(item.elements, handleClick)}
              <span className='react-contextmenu-borderTop'></span>
          </SubMenu>);
        }
      }
    );
  }

  render() {

    let menuItems = [];

    for(let key in this.props.menu) {
      let suppMenu = this.props.menu[key];
      if( suppMenu.menu && suppMenu.handleClick ) {
        menuItems = menuItems.concat(this.getMenu(suppMenu.menu, suppMenu.handleClick));
      }
    }

    return (
      <>
        <ContextMenuTrigger id={this.props.id} holdToDisplay={-1}>
            {this.props.children}
        </ContextMenuTrigger>
        {(menuItems.length > 0) && <ContextMenu id={this.props.id}>

            {menuItems}
          <span className='react-contextmenu-borderTop'></span>
        </ContextMenu>}
      </>
    );



  }
}

export default ContextMenuBox;
