import React, { Component } from 'react';
import './Transform.css';
import ContextMenuBox from '../ContextMenuBox/ContextMenuBox';
import SliderBox from '../Input/SliderBox/SliderBox';
import Transform from './Transform';
import shortid from 'shortid';
import SVG from 'react-svg';

const linkMenuTypes = [
  {
    type: 'Link XY Axis'
  }
];

const unlinkMenuTypes = [
    {
        type: 'Unlink XY Axis'
    }
];

/*Attribute*/
//need to be refactored
class Transform2D extends Transform {

  state = {
    input: SliderBox,
    inputX: SliderBox,
    inputY: SliderBox,
    solo : false
  };

  constructor(props) {
    super(props);
    this.id = shortid.generate();
    this.className = Transform2D.className;
    this.values = {x: 0, y: 0};
    this.inputElements = {x: null, y: null};
    const linkMenu = {
        menu: linkMenuTypes,
        handleClick: (event, data) => {
            this.setState({solo: true}, () => {
            window.updateWorkspace();
            });
          }
    };
    
    this.menuX = [{...this.menu[0]}, linkMenu];
    this.menuX[0].handleClick = (event, data) => {
        if(data.type) {
            this.setState({inputX: window.getClassFromName(data.type)}, () => {
                window.updateWorkspace();
            });
        }
    };

    this.menuY = [{...this.menu[0]}, linkMenu];
    this.menuY[0].handleClick = (event, data) => {
        if(data.type) {
            this.setState({inputY: window.getClassFromName(data.type)}, () => {
                window.updateWorkspace();
            });
        }
    };


    const unlinkMenu = {
        menu: unlinkMenuTypes,
        handleClick: (event, data) => {
              this.setState({solo: false}, () => {
                window.updateWorkspace();
              });
          }
    };
    this.menu.push(unlinkMenu);
  }

  getInputValue() {
      if(this.state.solo) {
          const value = super.getInputValue()
          return {x: value, y: value};
      } else {
          return this.returns({x: this.inputElements.x.getValue(), y: this.inputElements.y.getValue()});
      }
  }

  render() {

    if(!this.state.solo) {
        return (
            <div className="Transform">
              {this.props.icon && <SVG className='TransformBox__icon' src={this.props.icon}/>}
              <div className="Transform2D__inputs">
                <ContextMenuBox id={this.constructor.className + this.id + '0'} menu={this.menuX}>
                    <div className='TransformBox__input'>
                        <this.state.inputX {...this.props} ref={el => this.inputElements.x = el} onChange={(value) => {
                        this.values.x = value;
                        if(this.props.onChange) this.props.onChange(this.values.x);
                        }} />
                    </div>
                </ContextMenuBox>
                <ContextMenuBox id={this.constructor.className + this.id + '1'} menu={this.menuY}>
                    <div className='TransformBox__input'>
                        <this.state.inputY {...this.props} ref={el => this.inputElements.y = el} onChange={(value) => {
                        this.values.y = value;
                        if(this.props.onChange) this.props.onChange(this.values.y);
                        }} />
                    </div>
                </ContextMenuBox>
              </div>
            </div>
        );
    } else {
        return super.render();
    }
    
  }
}

Transform2D.className = "Transform2D";
Transform2D.icon = undefined;

export default Transform2D;
