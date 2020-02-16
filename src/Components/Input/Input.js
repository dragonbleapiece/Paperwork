import { Component } from 'react';
import './Input.css';

const className = "Input";

class Input extends Component {

    state = {};

    static get className() {
        return className;
    }

    constructor(props) {
        super(props);
        if(this.props.input && this.constructor.className === this.props.input.className) {
            this.initFromSavedState(this.props.input.state)
        } else {
            this.init();
        }
    }

    initFromSavedState(state) {

    }

    init() {

    }

    getValue() {
        return 0;
    }

    toJSON() {
        return {};
    }

    update(state) {
        this.setState(state, () => {
            if(this.props.onChange) {
                this.props.onChange();
            }
            window.updateWorkspace();
        });
    }
}

export default Input;
