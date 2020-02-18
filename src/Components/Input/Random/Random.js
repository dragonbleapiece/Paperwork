import React from 'react';
import Input from '../Input';
import exactMath from 'exact-math';
import * as Utils from '../../../Utils';
import SVG from 'react-svg';
import random from '../../../Icons/dice.svg';
import arrowLeft from '../../../Icons/arrow_leftUI.svg';
import arrowRight from '../../../Icons/arrow_rightUI.svg';
import './Random.css';

const className = "Random";

class Random extends Input {

    static get className() {
        return className;
    }

    constructor(props) {
        super(props);
        this.step = (this.props.step || 1);
    }

    getValue() {
        return this.rand();
    }

    rand() {
        const rand = Math.random() * (this.state.to - this.state.from + this.step) + this.state.from;
        return this.fix(rand);
    }

    init() {
        this.state.from = this.props.min;
        this.state.to = this.props.max;
    }

    initFromSavedState(state) {
        this.state = state;
    }

    fix(value) {
        return Utils.fix(value, this.step);
    }

    toJSON() {
        return {...this.state};
    }


    render() {
        return (
            <div className='Input Random'>
                <input type='number' min={this.props.min} max={exactMath.sub(this.state.to, this.step)} step={this.step} value={this.state.from} onChange={(e) => {
                    const value = parseFloat(e.target.value ? e.target.value : 0);
                    if(e.target.min > value || e.target.max < value) return;
                    this.update({from: this.fix(value)});
                }}
                onMouseUp={(e) => {
                    const target = e.target;
                    target.select();
                  }}
                />
                <SVG className='Random__arrow' src={arrowLeft}/>
                <SVG className='Random__icon' src={random} />
                <SVG className='Random__arrow' src={arrowRight}/>
                <input type='number' min={exactMath.add(this.state.from, this.step)} max={this.props.max} step={this.step} value={this.state.to} onChange={(e) => {
                    const value = parseFloat(e.target.value ? e.target.value : 0);
                    if(e.target.min > value || e.target.max < value) return;
                    this.update({to: this.fix(value)});
                }}
                onMouseUp={(e) => {
                    const target = e.target;
                    target.select();
                  }}
                />
            </div>
        );
    }
}

export default Random;
