import ReactDOM from 'react-dom';

let _draggable = null;
let _droppables = {};
let _draggableIndex = 0;

class DragManager {
    static _instance = null;
    
    static get instance() {
        if(this._instance === null) {
            this._instance = new DragManager();
        }
        return this._instance;
    }

    set draggable(target) {
        _draggable = target;
        let node = ReactDOM.findDOMNode(target.refs.box);
        while((node = node.previousElementSibling) != null) {
            _draggableIndex++;
        }
    }

    get draggableParent() {
        return _draggable.props.parent;
    }

    get draggableIndex() {
        return _draggableIndex;
    }

    clear() {
        _draggable = null;
        this.clearDroppable();
        _draggableIndex = 0;
    }

    clearDroppable() {
        for(let droppableKey in _droppables) {
            let droppable = _droppables[droppableKey];
        }
        _droppables = {};
    }

    addDroppable(box) {
        _droppables[box.props.id] = box;
    }
}

export default DragManager;