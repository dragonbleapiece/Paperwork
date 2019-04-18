import React from 'react';
import Workspace from '../../Workspace/Workspace';
import Input from '../Input';
import Slider from 'rc-slider';
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
        onChange={(value) => {if(this.props.onChange) {this.props.onChange(value);}}}
        onAfterChange={() => Workspace.forceUpdate()}
        />
        );
    }
}

export default SliderBox;
