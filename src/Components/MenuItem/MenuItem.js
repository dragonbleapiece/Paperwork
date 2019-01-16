import React, { Component } from 'react';
import './MenuItem.css';

class MenuItem extends Component {
  constructor() {
    super();
    this.state = {
      selected: false,
      class: ""
    }
  }

  onClick() {
    if (this.state.selected == false) {
      this.setState({selected: true, class: "selected"});
    }
  }
  render() {
    return (
      <div
        className={this.state.class + " MenuItem"}
        onClick={this.onClick.bind(this)}
      >
        {this.props.children}
      </div>
    );
  }
}

export default MenuItem;
