import React, { Component } from 'react';
import './Transform.css';
import ContextMenuBox from '../ContextMenuBox/ContextMenuBox';
import SliderBox from '../Input/SliderBox/SliderBox';
import shortid from 'shortid';
import SVG from 'react-svg';

const inputMenu = [
  {
    type: 'Random'
  },
  {
    type: 'Increment'
  },
  {
    type: 'SliderBox',
    name: 'Value'
  }
];

/*Attribute*/
class Transform extends Component {

  state = {};

  constructor(props) {
    super(props);

    if(this.props.state) {
      this.initFromSavedState(this.props.state);
    } else {
      this.init();
    }

    this.id = shortid.generate();
    this.className = Transform.className;
    this.inputElement = React.createRef();
    this.returns = this.props.returns || ((value) => value);
    this.menu = [
      {
        menu: inputMenu,
        handleClick: (event, data) => {
          if(data.type) {
            this.setState({input: window.getClassFromName(data.type)}, () => {
              window.updateWorkspace();
            });
          }
        }
      }
    ];
  }

  componentDidUpdate() {
    // is late
    const {saveTransform} = this.props;
    if(saveTransform) {
        saveTransform(this.toJSON());
    }
  }

  initFromSavedState(state) {
    this.state.input = window.getClassFromName(state.input.className);
  }

  init() {
    this.state.input = SliderBox;
  }

  getInputValue() {
    return this.returns(this.inputElement.current.getValue());
  }

  toJSON() {
    return {input: {className: this.state.input.className, state: this.inputElement.current.toJSON()}};
  }

  render() {
    const {input} = this.props.state ? this.props.state : {};
    return (
      <ContextMenuBox id={this.constructor.className + this.id} menu={this.menu}>
        <div className="Transform">
          {this.props.icon && <SVG className='TransformBox__icon' src={this.props.icon}/>}
          <div className='TransformBox__input'>
            <this.state.input {...this.props} ref={this.inputElement} onChange={this.componentDidUpdate.bind(this)} input={input}/>
          </div>
        </div>
      </ContextMenuBox>
    );
  }
}

Transform.className = "Transform";
Transform.icon = undefined;

export default Transform;
