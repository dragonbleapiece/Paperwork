import React, {Component} from 'react';
import exactMath from 'exact-math';


class BoxInputNumber extends Component {

    onWheel(e) {
        const step = this.props.step ? this.props.step : 1;
        const value = parseFloat(e.target.value ? e.target.value : 0) + exactMath.mul(e.deltaY, step);
        if(e.target.min > value || e.target.max < value) return;
        if(this.props.onChange) {
            this.props.onChange(value);
        }
    }

    render() {
        return(
            <input
                {...this.props}
                type='number'
                title='Wheel in to change value'
                onChange={(e) => {
                    const value = parseFloat(e.target.value ? e.target.value : 0);
                    if(e.target.min > value || e.target.max < value) return;
                    if(this.props.onChange) {
                        this.props.onChange(value);
                    }
                }}
                onMouseUp={(e) => {
                    const target = e.target;
                    target.select();
                }}
                onFocus={(e) => {
                    e.target.addEventListener('wheel', this.onWheel.bind(this), false);
                }}
                onBlur={(e) => {
                    e.target.removeEventListener('wheel', this.onWheel.bind(this), false);
                    if (window.getSelection) {
                        if (window.getSelection().empty) {  // Chrome
                            window.getSelection().empty();
                        } else if (window.getSelection().removeAllRanges) {  // Firefox
                            window.getSelection().removeAllRanges();
                        }
                        } else if (document.selection) {  // IE?
                        document.selection.empty();
                    }
                }}
            />
        );
    }
}

export default BoxInputNumber;