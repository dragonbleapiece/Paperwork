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

  constructor(props) {
    super(props);
    this.id = shortid.generate();
    this.className = Transform2D.className;
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

  initFromSavedState(state) {
      if(state.solo) {
        super.initFromSavedState(state);
      } else {
        this.state.inputX = window.getClassFromName(state.inputX.className);
        this.state.inputY = window.getClassFromName(state.inputY.className);
      }

      this.state.solo = state.solo;
  }

  init() {
      super.init();
      this.state.inputX = SliderBox;
      this.state.inputY = SliderBox;
      this.state.solo = false;
  }

  getInputValue() {
      if(this.state.solo) {
          const value = super.getInputValue()
          return {x: value, y: value};
      } else {
          return this.returns({x: this.inputElements.x.getValue(), y: this.inputElements.y.getValue()});
      }
  }

  toJSON() {
      if(this.state.solo) {
          return {...super.toJSON(), solo: this.state.solo};
      } else {
          return {
              inputX: {className: this.state.inputX.className, state: this.inputElements.x.toJSON()},
              inputY: {className: this.state.inputY.className, state: this.inputElements.y.toJSON()},
              solo: this.state.solo
            };
      }
  }

  render() {

    // onChange not useful
    if(!this.state.solo) {
        const {inputX, inputY} = this.props.state ? this.props.state : {};
        return (
            <div className="Transform">
              {this.props.icon && <SVG className='TransformBox__icon' src={this.props.icon}/>}
              <div className="Transform2D__inputs">
                <ContextMenuBox id={this.constructor.className + this.id + '0'} menu={this.menuX}>
                    <div className='TransformBox__input'>
                        <this.state.inputX {...this.props} ref={el => this.inputElements.x = el} input={inputX}/>
                    </div>
                </ContextMenuBox>
                <ContextMenuBox id={this.constructor.className + this.id + '1'} menu={this.menuY}>
                    <div className='TransformBox__input'>
                        <this.state.inputY {...this.props} ref={el => this.inputElements.y = el} input={inputY}/>
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
