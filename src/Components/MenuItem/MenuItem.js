import React, { Component } from 'react';
import './MenuItem.css';

class MenuItem extends Component {
  constructor(props) {
    super(props);
    this.className = () => {
      return(
        "MenuItem "+ (this.props.active ? "active" : "")
      )
    };
  }
  onClick() {
    this.props.handleClick(this.props.index);
    this.className();
  }
  render() {
    console.log(this.props.children, this.props.active);
    return (
      <li className={this.className()} onClick={this.onClick.bind(this)}>
        {this.props.children}
      </li>
    );
  }
}

export default MenuItem;
