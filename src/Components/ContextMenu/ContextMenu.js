import React, { Component } from 'react';
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";

const MENU_TYPE = 'SIMPLE22';
const MENU_TYPE2 = 'SIMPLE222';

export default class WorkspaceMenu extends Component {
    constructor(props) {
        super(props);

        this.state = { logs: [] };
    }

    handleClick = (e, data) => {
        this.setState(({ logs }) => ({
            logs: [`Clicked on menu ${data.item}`, ...logs]
        }));
    }

    render() {
        return (
            <div>
                <ContextMenuTrigger id={MENU_TYPE} holdToDisplay={1000}>
                    <div className='Markov Box'>
                        <span>Markov</span>
                        <ContextMenuTrigger id={MENU_TYPE2} holdToDisplay={1000}>
                            <div className='Repartition Box'>
                              <span>Repartition</span>
                            </div>
                        </ContextMenuTrigger>
                    </div>
                </ContextMenuTrigger>
                <div>
                    {this.state.logs.map((log, i) => <p key={i}>{log}</p>)}
                </div>
                <ContextMenu id={MENU_TYPE}>
                    <MenuItem onClick={this.handleClick} data={{ item: 'Markov' }}>Markov</MenuItem>
                    <MenuItem onClick={this.handleClick} data={{ item: 'Algorithm 1' }}>Algorithm 1</MenuItem>
                    <MenuItem divider />
                    <MenuItem onClick={this.handleClick} data={{ item: 'Algorithm 2' }}>Algorithm 2</MenuItem>
                </ContextMenu>
                <ContextMenu id={MENU_TYPE2}>
                    <MenuItem onClick={this.handleClick} data={{ item: 'Square' }}>Square</MenuItem>
                    <MenuItem onClick={this.handleClick} data={{ item: 'Circle' }}>Circle</MenuItem>
                    <MenuItem divider />
                    <MenuItem onClick={this.handleClick} data={{ item: 'Triangle' }}>Triangle</MenuItem>
                </ContextMenu>
            </div>
        );
    }
}
      // <ul className="ContextMenu">
      //   <li className="ContextMenu__item button">
      //     <span className="ContextMenu__itemIcon">Ico</span><span className="ContextMenu__itemText">Markov</span>
      //   </li>
      //   <li className="ContextMenu__item button">
      //     <span className="ContextMenu__itemIcon">Ico</span><span className="ContextMenu__itemText">Distribution</span>
      //   </li>
      // </ul>
