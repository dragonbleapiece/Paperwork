import React from 'react';
import Input from '../Input';
import exactMath from 'exact-math';
import SVG from 'react-svg';
import random from '../../../Icons/dice.svg';
import arrowLeft from '../../../Icons/arrow_leftUI.svg';
import arrowRight from '../../../Icons/arrow_rightUI.svg';
import './Random.css';

class Random extends Input {

    state = {};

    constructor(props) {
        super(props);
        this.state.from = this.props.min;
        this.state.to = this.props.max;
        this.step = (this.props.step || 1);
    }

    getValue() {
        return this.rand();
    }

    rand() {
        const rand = Math.random() * (this.state.to - this.state.from + this.step) + this.state.from;
        return this.fix(rand);
    }

    componentDidUpdate() {
        this.props.onChange(this.rand(), this);
    }

    fix(value) {
        const netValue = exactMath.mul(exactMath.floor(exactMath.div(parseFloat(value), this.step)), this.step);
        return netValue;
    }

    render() {
        return (
            <div className='Input Random'>
                <input type='number' min={this.props.min} max={exactMath.sub(this.state.to, this.step)} step={this.step} value={this.state.from} onChange={(e) => {
                    const value = e.target.value ? e.target.value : 0;
                    if(e.target.min > value || e.target.max < value) return;
                    this.setState({from: this.fix(value)});
                    window.updateWorkspace();
                }}/>
                <SVG className='Random__arrow' src={arrowLeft}/>
                <SVG className='Random__icon' src={random} />
                <SVG className='Random__arrow' src={arrowRight}/>
                <input type='number' min={exactMath.add(this.state.from, this.step)} max={this.props.max} step={this.step} value={this.state.to} onChange={(e) => {
                    const value = e.target.value ? e.target.value : 0;
                    if(e.target.min > value || e.target.max < value) return;
                    this.setState({to: this.fix(value)});
                    window.updateWorkspace();
                }}/>
            </div>
        );
    }
}

export default Random;
