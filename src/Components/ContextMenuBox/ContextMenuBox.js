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
      {
        type: 'Grid'
      }
    ]
  },
  {
    type: 'Elements',
    elements: [
      {
        name: 'Basic Shapes',
        type: 'Rectangle',
        elements: [
          {
            type: 'Rectangle'
          },
          {
            type: 'Triangle'
          },
          {
            type: 'Ellipse'
          }
        ]
      },
      {
        type: 'HHatching',
        name: 'Hatching',
        elements: [
          {
            type: 'HHatching',
            name: 'Horizontal'
          },
          {
            type: 'VHatching',
            name: 'Vertical'
          },
          {
            type: 'LOHatching',
            name: 'Left Oblique'
          },
          {
            type: 'ROHatching',
            name: 'Right Oblique'
          }
        ]
      },
      {
        type: 'Void'
      }
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
        if(this.props.el.constructor.unauthorized.indexOf(item.type) === -1) {
          let icon = window.getIconClassFromName(item.type);
          if (!item.elements) {
            return (<MenuItem onClick={handleClick} data={{ type: item.type, el: this.props.el }} key={shortid.generate()}>
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
      }
    );
  }

  render() {

    let menuItems = [];
    if(this.props.el.constructor.unauthorized.indexOf("*") === -1) {
      menuItems = this.getMenu(menu, this.handleClick.bind(this));
    }

    for(let key in this.props.suppMenu) {
      let suppMenu = this.props.suppMenu[key];
      if( suppMenu.menu && suppMenu.handleClick ) {
        menuItems = menuItems.concat(this.getMenu(suppMenu.menu, suppMenu.handleClick));
      }
    }

    //console.log(this.props.el.constructor.className, menuItems, menuItems.length);

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
