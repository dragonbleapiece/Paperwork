import React, {Component} from 'react';
import './Log.css';

class Log extends Component {

    constructor(props) {
        super(props);
        this.onClose = (this.props.onClose instanceof Function) ? this.props.onClose : (e) => {};
        this.text = new String(this.props.children);
    }

    render() {
        return(
            <div className='Log' onClick={this.onClose}>
                <span>{this.text.toString()}</span>
            </div>
        );
    }
}

export default Log;