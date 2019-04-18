import React from 'react';
import Workspace from '../../Workspace/Workspace';
import Input from '../Input';
import { Range } from 'rc-slider';
import './RangeBox.css';

class RangeBox extends Input {
    render() {
        let trackStyleArray = new Array(this.props.count);
        trackStyleArray.fill({height: '8px', backgroundColor: 'black', borderRadius: 'unset' });
        let handleStyleArray = new Array(this.props.count);
        handleStyleArray.fill({marginTop: '-3px', borderColor: 'black' });
        return(
        <Range
        {...this.props}
        className="Box__slider"
        style={{padding: '3px 0'}}
        trackStyle={trackStyleArray}
        railStyle={{height: '8px', backgroundColor: 'black', borderRadius: 'unset' }}
        handleStyle={handleStyleArray}
        dotStyle={{bottom: '-4px', borderColor: 'black' }}
        onChange={(value) => {this.props.onChange(value);}}
        onAfterChange={() => Workspace.forceUpdate()}
        ref={el => {if(this.props.innerRef) this.props.innerRef(el);}}
        />
        );
    }
}

export default RangeBox;
