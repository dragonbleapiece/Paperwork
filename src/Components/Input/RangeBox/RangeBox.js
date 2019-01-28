import React from 'react';
import Workspace from '../../Workspace/Workspace';
import Input from '../Input';
import Slider, { Range } from 'rc-slider';
import './RangeBox.css';

class RangeBox extends Input {
    constructor(props) {
        super(props);
    }

    render() {
        let trackStyleArray = new Array(this.props.count);
        trackStyleArray.fill({height: '8px', backgroundColor: 'black', borderRadius: 'unset' });
        let handleStyleArray = new Array(this.props.count);
        handleStyleArray.fill({marginTop: '-3px', borderColor: 'black' });
        return(
        <Range
        min={this.props.min}
        max={this.props.max}
        defaultValue={this.props.defaultValue}
        marks={this.props.marks}
        step={this.props.steps}
        count={this.props.count}
        pushable={this.props.pushable}
        className="Box__slider"
        style={{padding: '3px 0'}}
        trackStyle={trackStyleArray}
        railStyle={{height: '8px', backgroundColor: 'black', borderRadius: 'unset' }}
        handleStyle={handleStyleArray}
        dotStyle={{bottom: '-4px', borderColor: 'black' }}
        onChange={(value) => {this.props.onChange(value); Workspace.forceUpdate();}}
        />
        );
    }
}

export default RangeBox;
