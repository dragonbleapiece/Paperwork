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
    type: 'SliderBox'
  }
];

/*Attribute*/
class Transform extends Component {

  state = {
    input: SliderBox
  };

  constructor(props) {
    super(props);
    this.id = shortid.generate();
    this.className = Transform.className;
    this.value = 0;
    this.inputElement = null;
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

  getInputValue() {
    return this.returns(this.inputElement.getValue());
  }

  render() {
    return (
      <ContextMenuBox id={this.constructor.className + this.id} menu={this.menu}>
        <div className="Transform">
          {this.props.icon && <SVG className='TransformBox__icon' src={this.props.icon}/>}
          <div className='TransformBox__input'>
            <this.state.input {...this.props} ref={el => this.inputElement = el} onChange={(value) => {
              this.value = value;
              if(this.props.onChange) this.props.onChange(this.value);
            }} />
          </div>
        </div>
      </ContextMenuBox>
    );
  }
}

Transform.className = "Transform";
Transform.icon = undefined;

export default Transform;
