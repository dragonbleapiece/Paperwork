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
          <div className="App-logo">Paperwork</div>
          <div className="about" onClick={this.aboutClick.bind(this)}>
            <SVG src={icon_info}/>
          </div>
        </header>
        <main>
          <div className="leftSide">
              <div className="aboutContainer" ref="aboutContainer">
                <span className="aboutTitle">What is Paperwork?<br/><br/><br/><br/></span>
                <span>
                Paperwork is an online software for research in art and in the field of computer and visual research. It is developped in the perspective of computer art practice in the context of art schools, colleges, high schools and so on.<br/><br/>
                The application helps producing drawings in the philosophy of generative processes. It is concerned with patterns, polygons, repertories and grammars. Moreover, the interface enables the learning and the editing of algorithms and therefore the construction of simple computational processes. It also offers to export formats svg format that makes it compatible with the traditionnal vector work area as well as digital tooling and 3D environements (pen plotter, laser cutting, ...).<br/><br/>
                Paperwork's first algorithm will be Markov Chain, an algorithm that was used in early computer art and now heavily used in our digital environment.<br/><br/>
                Paperwork is based on the previsous Experiment Generic Images 2018.<br/><br/>
                Paperwork is a process developped by a group of people : ingineers, artists, students, researchers, ... 
                </span>
                <span className="aboutCredits">
                Gaëtan Robillard<br/>
                Avec Nicolas Cusumano, Cécile Rousset, Vincent Schmid, Quentin Sedmi<br/><br/>
                Le laboratoire des Intuitions (ESAD TALM-Tours), et la formation ingénieur IMAC (ESIPE – UPEM)
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
