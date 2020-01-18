import React from 'react';
import Input from '../Input';
import Canvas from '../../Canvas/Canvas';
import './Increment.css';

class Increment extends Input {

    constructor(props) {
        super(props);
        this.state.from = props.min;
        this.state.to = props.max;
        this.state.condition = 'limited';
        this.state.increment = 1;
        this.increment = this.state.increment;
        this.props.step = props.step || 1;
        this.value = this.state.from;
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

    condition(value) {
        switch(this.state.condition) {
            case('looped'):
                return this.looped(value);
            case('loopedInverse'):
                return this.loopedInverse(value);
            default:
                return this.limited(value);
        }
    }

    limited(value) {

    }

    looped(value) {

    }

    loopedInverse(value) {

    }

    render() {
        return (
            <div className='Input Increment'>
                <input type='number' min={this.props.min} max={this.state.to - this.props.step} step={this.props.step} onChange={(e) => {
                    this.setState({from: Math.floor(parseFloat(e.target.value) / this.props.step) * this.props.step});
                    this.props.onChange(this.rand());
                }}/>
                <input type='number' min={this.state.from + this.props.step} max={this.props.max} step={this.props.step} onChange={(e) => {
                    this.setState({to: Math.floor(parseFloat(e.target.value) / this.props.step) * this.props.step});
                    this.props.onChange(this.rand());
                }}/>
                <select onChange={(e) => {this.setState({condition: e.target.value})}}>
                    <option value='limited'>Limited</option>
                    <option value='looped'>Looped</option>
                    <option value='loopedInverse'>LoopedInverse</option>
                </select>
                <label for='decrement'>Decrement</label>
                <input type='checkbox' name='decrement' onChange={(e) => {this.setState({decrement : -this.state.increment})}} />
            </div>
        );
    }
}

export default Increment;
