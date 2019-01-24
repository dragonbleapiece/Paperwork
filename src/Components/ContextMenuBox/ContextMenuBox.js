import React, { Component } from 'react';
import './ContextMenuBox.css';
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";

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
      elements: [
        {type: 'Grid',
         icon: grid_on}
      ]
  },
  {
    type: 'Grid',
    icon: grid_on
  },
  {
    type: 'Rectangle'
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
      (item, index) => window.isAuthorized(item.type, this.props.unauthorized) &&
      <MenuItem className="ContextMenu__item" onClick={this.handleClick} data={{ type: item.type, el: this.props.el }} key={index}>
        {item.icon && <span className="react-contextmenu-itemIcon"><SVG src={item.icon}/></span>}
        <span className="react-contextmenu-itemText">{item.type}</span>
      </MenuItem>
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
