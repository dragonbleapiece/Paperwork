import React from 'react';
import Workspace from '../../Workspace/Workspace';
import Input from '../Input';
import Slider, { Range } from 'rc-slider';
import './SliderBox.css';

class SliderBox extends Input {
    constructor(props) {
        super(props);
    }

    render() {
        return(
        <Slider
        min={this.props.min}
        max={this.props.max}
        defaultValue={this.props.defaultValue}
        marks={this.props.marks}
        step={this.props.steps}
        className="Box__slider"
        style={{padding: '3px 0'}}
        trackStyle={{height: '8px', backgroundColor: 'black', borderRadius: 'unset' }}
        railStyle={{height: '8px', backgroundColor: 'black', borderRadius: 'unset' }}
        handleStyle={{marginTop: '-3px', borderColor: 'black' }}
        dotStyle={{bottom: '-4px', borderColor: 'black' }}
        onChange={(value) => {this.props.onChange(value); Workspace.forceUpdate();}}
        />
        );
    }
}

export default SliderBox;
