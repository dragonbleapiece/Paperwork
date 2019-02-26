import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './App.css';
//import Icons
import SVG from 'react-svg'
import icon_code from '../../Icons/code.svg';
import icon_info from '../../Icons/info.svg';
// import Components
import Workspace from '../../Components/Workspace/Workspace';
import Save from '../../Components/Save/Save';
import Canvas from '../../Components/Canvas/Canvas';
// import Boxes
import {getClassFromName} from '../../Components/Index';

window.getClassFromName = getClassFromName;

window.updateWorkspace = Workspace.forceUpdate;

window.addClassToElement = function(name, target) {
  let cl = getClassFromName(name);
  target.addChild(cl);
  if(!(target instanceof Workspace)) {
    Workspace.forceUpdate();
  }
};

window.getIconClassFromName = function(name) {
  let cl = getClassFromName(name);
  if(cl) {
    return cl.icon;
  } else {
    return undefined;
  }
}

window.isAuthorized = function(type, unauthorized) {
  let r = true;
  if(!type) return false;

  if(unauthorized instanceof Array) {
    let obj;
    if(typeof type === "string") {
      let cl = getClassFromName(type);
      obj = new cl();
    } else {
      obj = new type();
    }

    for(let i = 0; i < unauthorized.length && r; ++i) {
      let unauthorizedClass = getClassFromName(unauthorized[i]);
      if(unauthorizedClass === null) {
        console.error(unauthorized[i] + " : Invalid unauthorized Class");
        continue;
      }
      r = r && !(obj instanceof unauthorizedClass);
    }
  } else {
    return false;
  }

  return r;
}

let toggle = false;

class App extends Component {
  state = {
  }
  constructor(props){
    super(props);
  }

  aboutClick() {
    let aboutDisplay = 'none';
    if(!toggle) {
      toggle = !toggle;
      aboutDisplay = 'flex';
     } else {
      toggle = !toggle;
      aboutDisplay = 'none';
     };
    ReactDOM.findDOMNode(this.refs["aboutContainer"]).style.display = aboutDisplay ;
  }

  render() {

    return (
      <div className="App">
        <header className="App-header border-bottom">
          <div className="App-logo">Paper&nbsp;&#123;&nbsp;&nbsp;&nbsp;&#125;</div>
          <div className="about" onClick={this.aboutClick.bind(this)}>
            <SVG src={icon_info}/>
          </div>
        </header>
        <main>
          <div className="leftSide">
              <div className="aboutContainer" ref="aboutContainer">
                <span className="aboutTitle">What is Paper?<br/><br/><br/><br/></span>
                <span>
    Paper is a sandbox for researching algorithmic processes in art. It should help producing drawings in the philosophy of generative processes.<br/>
    Our effort takes place in a dialectic with connectionism which currently has an upperhand in the sciences.<br/><br/><br/>
    Paper is a process developped by a group of people : ingineers, artists, students, researchers, ...<br/>
    Paper is based on the Experiment Generic Images 2018.<br/><br/>
    Paper is research. Paper enables creating new artworks.<br/><br/>
    Paper is algorithmic. Paper is intuitive. Paper works as an archive.<br/><br/>
    Papers' first algorithm is Markov Chain, an algorithm that was used in early computer art and now heavily used in our digital environment.<br/><br/><br/><br/>
    Gaëtan Robillard with Nicolas Cusumano, Cécile Rousset, Vincent Schmid, Quentin Sedmi.
                </span>
              </div>
              <Workspace>

              </Workspace>
          </div>
            <div className="rightSide border-left">
              <div className="editionMenu border-bottom">
                <div className="button displayCode border-right">
                  <SVG src={icon_code}/>
                </div>
                <Save/>
              </div>
                <Canvas/>
            </div>
        </main>
      </div>
    );
  }
}

export default App;
