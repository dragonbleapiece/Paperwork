import React from 'react';
import Workspace from '../../Workspace/Workspace';
import Input from '../Input';
import Slider from 'rc-slider';

import 'rc-slider/assets/index.css';
import './SliderBox.css';

const className = "SliderBox";

const SliderTooltip = Slider.createSliderWithTooltip(Slider);

class SliderBox extends Input {

    static get className() {
        return className;
    }

    initFromSavedState(state) {
        this.value = state.value;
    }

    init() {
        this.value = this.props.defaultValue;
    }

    getValue() {
        return this.value;
    }

    toJSON() {
        return {value: this.value};
    }

    render() {
        return(
        <SliderTooltip
            min={this.props.min}
            max={this.props.max}
            defaultValue={this.value}
            marks={this.props.marks}
            step={this.props.step}
            className="Box__slider"
            style={{padding: '3px 0'}}
            trackStyle={{height: '8px', backgroundColor: 'black', borderRadius: 'unset' }}
            railStyle={{height: '8px', backgroundColor: 'black', borderRadius: 'unset' }}
            handleStyle={{marginTop: '-3px', borderColor: 'black' }}
            dotStyle={{bottom: '-4px', borderColor: 'black' }}
            onChange={(value) => {
                this.value = value;
                if(this.props.onChange) {
                    this.props.onChange(value);
                }
            }}
            onAfterChange={() => Workspace.forceUpdate()}
            tipProps={{placement: this.props.placementTip ? this.props.placementTip : 'bottom'}}
        />
        );
    }
}

export default SliderBox;
