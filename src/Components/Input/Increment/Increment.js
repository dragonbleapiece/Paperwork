import React from 'react';
import Input from '../Input';
import Canvas from '../../Canvas/Canvas';
import exactMath from 'exact-math';
import SVG from 'react-svg';
import increment from '../../../Icons/increment.svg';
import decrement from '../../../Icons/decrement.svg';
import arrowLeft from '../../../Icons/arrow_leftUI.svg';
import arrowRight from '../../../Icons/arrow_rightUI.svg';
import looped from '../../../Icons/repeat.svg';
import loopedInverse from '../../../Icons/sync_alt.svg';
import limited from '../../../Icons/trending_flat.svg';
import './Increment.css';

const inputOptionsIcons = [
    {
        icon: limited,
        id: 'limited',
        title: 'Limited'
    },
    {
        icon: looped,
        id: 'looped',
        title: 'Looped'
    },
    {
        icon: loopedInverse,
        id: 'loopedInverse',
        title: 'Looped Inverse'
    }
];

class Increment extends Input {

    state = {

    };

    constructor(props) {
        super(props);
        this.state.from = props.min;
        this.state.to = props.max;
        this.state.condition = 0;
        this.state.increment = 1;
        this.increment = this.state.increment;
        this.step = props.step || 1;
        this.state.step = this.step;
        this.value = this.state.from;
        this.target = null;
        Canvas.attach(this);
    }

    componentWillUnmount() {
        Canvas.detach(this);
    }

    receiveNotification() {
        if(this.state.decrement === -1) {
            this.value = this.state.to;
        } else {
            this.value = this.state.from;
        }

        this.increment = this.state.increment;
    }

    getValue() {
        const actualValue = this.value;
        const value = exactMath.add(this.value, exactMath.mul(this.increment, this.state.step));
        this.value = this.condition(value);
        return actualValue;
    }

    condition(value) {
        switch(this.state.condition) {
            case(1):
                return this.looped(value);
            case(2):
                return this.loopedInverse(value);
            default:
                return this.limited(value);
        }
    }

    fix(value) {
        const netValue = exactMath.mul(exactMath.floor(exactMath.div(parseFloat(value), this.step)), this.step);
        return netValue;
    }

    limited(value) {
        if(this.state.increment === 1) {
            return (value >= this.state.to) ? this.state.to : value;
        } else {
            return (value <= this.state.from) ? this.state.from : value;
        }
    }

    looped(value) {
        if(this.state.increment === 1) {
            return (value > this.state.to) ? exactMath.sub(value, this.state.to) : value;
        } else {
            return (value < this.state.from) ? exactMath.add(value, this.state.to) : value;
        }
    }

    loopedInverse(value) {
        if(value > this.state.to || value < this.state.from) {
            this.increment = -this.increment;
            if(value > this.state.to) {
                return exactMath.add(this.state.to, exactMath.mul(this.increment, this.state.step));
            } else {
                return exactMath.add(this.state.from, exactMath.mul(this.increment, this.state.step));
            }
            
        }
        return value;
    }

    onChangeOption(e) {
        this.setState({condition: parseInt(e.target.value, 10)});
        window.updateWorkspace();
    }

    render() {

        const incrementIcon = (this.state.increment === 1) ? increment : decrement;
        const InputOptions = inputOptionsIcons.map(({icon, id, title}, index) => {
            const selected = (this.state.condition === index) ? 'selected' : ''; 
            return (
                <label title={title} className={selected}>
                    <input
                        checked={this.state.condition === index}
                        type='radio'
                        name='condition'
                        value={index}
                        onChange={this.onChangeOption.bind(this)}
                    />
                    <SVG className={'Increment__icon'} src={icon}/>
                </label>
            );
        });

        return (
            <div className='Input Increment'>
                <div className='Increment__limits'>
                    <input type='number' min={this.props.min} max={exactMath.sub(this.state.to, this.step)} step={this.step} value={this.state.from} onChange={(e) => {
                        const value = e.target.value ? e.target.value : 0;
                        if(e.target.min > value || e.target.max < value) return;
                        this.setState({from: this.fix(value)});
                        window.updateWorkspace();
                    }}/>

                    <SVG className='Random__arrow' src={arrowLeft} style={(this.state.increment === 1) ? ({visibility: 'hidden'}) : {}}/>
                    
                    <div className='Increment__step'>
                        <input title='step' type='number' min={this.step} max={exactMath.sub(this.state.to, this.state.from)} step={this.step} value={this.state.step} onChange={(e) => {
                            const value = e.target.value ? e.target.value : 0;
                            if(e.target.min > value || e.target.max < value) return;
                            this.setState({step: this.fix(value)});
                            window.updateWorkspace();
                        }}/>
                        <SVG className='Increment__icon' src={incrementIcon} onClick={(e) => {
                            this.setState({increment : -this.state.increment});
                            window.updateWorkspace();
                        }}/>
                    </div>
                    <SVG className='Random__arrow' src={arrowRight} style={(this.state.increment === -1) ? ({visibility: 'hidden'}) : {}}/>

                    <input type='number' min={exactMath.add(this.state.from, this.step)} max={this.props.max} step={this.step} value={this.state.to} onChange={(e) => {
                        const value = e.target.value ? e.target.value : 0;
                        if(e.target.min > value || e.target.max < value) return;
                        this.setState({to: this.fix(value)});
                        window.updateWorkspace();
                    }}/>
                </div>
                <div className='Increment__options'>
                    {InputOptions}
                </div>
            </div>
        );
    }
}

export default Increment;
