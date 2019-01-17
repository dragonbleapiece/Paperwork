import React, { Component } from 'react';
import './Menu.css';
// import Components
import MenuItem from '../../Components/MenuItem/MenuItem';

class Menu extends Component {
constructor(props){
  super(props);
  this.state = {
    activeItem: 0
  }
}

  handleClick(menuItem) {
    this.setState({
      activeItem: menuItem
    }, () => {console.log(this.state.activeItem)});
  }

  render() {
    let linksMarkup = this.props.links.map((link, index) => {
      return (
      <MenuItem key={index} index={index} active={this.state.activeItem === index} handleClick={this.handleClick.bind(this)}>{link.title}</MenuItem>
      );
    });

    return (     
      <ul className="Menu">
        {linksMarkup}
      </ul>
    );
  }
}

export default Menu;
