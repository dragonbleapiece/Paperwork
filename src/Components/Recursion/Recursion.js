import React from 'react';
import BoxGroup from '../BoxGroup/BoxGroup';
import './Recursion.css';
import SVG from 'react-svg';
import recursion from '../../Icons/filter.svg';
import recursionOption from '../../Icons/filter_none.svg';

const className = "Recursion";
const unauthorized = ["Placement", "Recursion", "Markov", "Void"];

/*Pencil*/
class Recursion extends BoxGroup {

    static get className() {
        return className;
    }

    static get icon() {
        return recursion;
    }

    static get unauthorized() {
        return [...super.unauthorized, ...unauthorized];
    }

    constructor(props) {
        super(props);
        this.className += " " + Recursion.className;

        this.hasInfo = true;
    }

    initState() {
        super.initState();
        this.state.recursionMax = 2;
    }

    getTransforms() {
        return (
            <div className='Transform'>
                <SVG src={recursionOption} className='TransformBox__icon'/>
                <div className='Recursion__options'>
                    <input type='number' min={1} max={3} value={this.state.recursionMax} onChange={(e) => {
                        const value = parseInt(e.target.value, 10) || 0;
                        if(e.target.min > value || e.target.max < value) return;
                        this.setState({recursionMax: value});
                        window.updateWorkspace();
                    }}/>
                </div>
            </div>
        );
    }
}

export default Recursion;
