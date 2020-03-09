import React from 'react';
import BoxGroup from '../BoxGroup/BoxGroup';
import './Recursion.css';
import SVG from 'react-svg';
import recursion from '../../Icons/filter.svg';
import recursionOption from '../../Icons/filter_none.svg';
import Canvas from '../Canvas/Canvas';
import Log from '../Log/Log';
import * as Utils from '../../Utils';

const className = "Recursion";
const unauthorized = ["Placement", "Recursion", "Markov", "Void"];

const maxRecursionWhenDuplicate = 2;
const maxRecursion = 5;
const maxThisBox = 4;
const maxThisBoxWhenDuplicate = 3;

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
        this.suppMenu = [];
        this.hasInfo = true;
        this.globalRecursion = 0;
        Canvas.attach(this);
    }

    receiveNotification() {
        this.globalRecursion = 0;
    }

    componentWillUnmount() {
        Canvas.detach(this);
    }

    filterUnauthorized(menu) {
        if(this.constructor.unauthorized.indexOf('*') !== -1) {
            return [];
        }
        const filteredMenu = menu.filter((item) => this.constructor.unauthorized.indexOf(item.type) === -1);
        if(this.hasParent('Recursion') && (this.state.nbThisBox < maxThisBox && this.state.ignoreThisBox || this.state.nbThisBox < maxThisBoxWhenDuplicate)) {
            return [...filteredMenu, {type: 'ThisBox'}];
        }
        return filteredMenu;
    }

    getColorMenu() {
        return [];
    }

    initState() {
        super.initState();
        this.state.recursionMax = 2;
        this.state.ignoreThisBox = true;
        this.state.nbThisBox = 0;
        this.state.log = false;
    }

    draw(sk) {
        let el = this.elements;
        for(let i = 0; i < el.length; ++i) {
            let element = el[i];
            if(this.state.ignoreThisBox && this.globalRecursion > this.state.recursionMax) {
                continue;
            }
            sk.push();
                this.drawBeforeChild(sk, element);
                if(element) element.draw(sk);
            sk.pop();
        }
    }

    getInfo() {
        return (
            <>
                <p>Recursion occurs when a thing is defined in terms of itself or of its type.</p>
                <p>In other words, it's an object or a process that <strong>refers to itself</strong>.</p>
                <p>It's a infinite loop and a limit condition is necessary.</p>
            </>
        );
    }

    doBeforeRender() {
        this.reloadMenu(); //Force reload menu
    }

    getTransforms() {
        return (
            <>
                <div className='Transform'>
                    <SVG src={recursionOption} className='TransformBox__icon'/>
                    <div className='Recursion__options'>
                        <input type='number' min={1} max={this.state.ignoreThisBox ? maxRecursion : maxRecursionWhenDuplicate} value={this.state.recursionMax} onChange={(e) => {
                            const value = parseInt(e.target.value, 10) || 0;
                            if(e.target.min > value || e.target.max < value) return;
                            this.setState({recursionMax: value});
                            window.updateWorkspace();
                        }}
                        onMouseUp={(e) => {
                            const target = e.target;
                            target.select();
                          }}
                        />
                    </div>
                </div>
                <div className='Transform'>
                    <div className='Recursion__options'>
                        <label className='Recursion__duplicate'>
                            <input type='checkbox' checked={this.state.ignoreThisBox} onChange={(e) => {
                                if(this.state.nbThisBox <= maxThisBoxWhenDuplicate) {
                                    this.setState({ignoreThisBox: !this.state.ignoreThisBox, recursionMax: !this.state.ignoreThisBox ? this.state.recursionMax : Utils.clamp(this.state.recursionMax, 1, maxRecursionWhenDuplicate)});
                                } else {
                                    this.setState({log: true});
                                }
                                window.updateWorkspace();
                            }}/>
                            <span className='checkmark'></span>
                            <span>No Global Duplication</span>
                        </label>
                        {this.state.log && <Log onClose={(e) => this.setState({log: false})}>Please, remove some ThisBox</Log>}
                    </div>
                </div>
            </>
        );
    }
}

export default Recursion;
