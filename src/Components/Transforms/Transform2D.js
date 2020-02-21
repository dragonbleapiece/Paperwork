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
    this.inputElementY = React.createRef();

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
            this.setState({input: window.getClassFromName(data.type)}, () => {
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
              this.setState({solo: false, inputY: this.state.input}, () => {
                window.updateWorkspace();
              });
          }
    };
    this.menu.push(unlinkMenu);
  }

  initFromSavedState(state) {
    super.initFromSavedState(state);
    if(!state.solo) {
        this.state.inputY = window.getClassFromName(state.inputY.className);
    } else {
        this.state.inputY = this.state.input;
    }
    this.state.solo = state.solo;
  }

  init() {
      super.init();
      this.state.inputY = SliderBox;
      this.state.solo = false;
  }

  getInputValue() {
      if(this.state.solo) {
          const value = super.getInputValue();
          return {x: value, y: value};
      } else {
          return this.returns({x: this.inputElement.current.getValue(), y: this.inputElementY.current.getValue()});
      }
  }

  toJSON() {
    let json = {...super.toJSON(), solo: this.state.solo};

    if(!this.state.solo) {
        json.inputY = {className: this.state.inputY.className, state: this.inputElementY.current.toJSON()};
    } else {
        json.inputY = json.input;
    }

    return json;
  }

  render() {

    if(!this.state.solo) {
        const {input, inputY} = this.props.state ? this.props.state : {};

        return (
            <div className="Transform">
              {this.props.icon && <SVG className='TransformBox__icon' src={this.props.icon}/>}
              <div className="Transform2D__inputs">
                <ContextMenuBox id={this.constructor.className + this.id} menu={this.menuX}>
                    <div className='TransformBox__input'>
                        <this.state.input {...this.props} ref={this.inputElement} onChange={this.componentDidUpdate.bind(this)} input={input}/>
                    </div>
                </ContextMenuBox>
                <ContextMenuBox id={this.constructor.className + this.id + '1'} menu={this.menuY}>
                    <div className='TransformBox__input'>
                    <this.state.inputY {...this.props} ref={this.inputElementY} onChange={this.componentDidUpdate.bind(this)} input={inputY}/>
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
