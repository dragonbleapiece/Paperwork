import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import '../../Assets/font/SpaceGrotesk.css';
import './App.css';
//import Icons
import SVG from 'react-svg'
import icon_info from '../../Icons/info.svg';
import icon_git from '../../Icons/Github.svg';
// import Components
import Workspace from '../../Components/Workspace/Workspace';
import Save from '../../Components/Save/Save';
import Canvas from '../../Components/Canvas/Canvas';
// import Boxes
import {getClassFromName} from '../../Components/Index';

window.getClassFromName = getClassFromName;

window.isInThisBoxCall = false;

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
    if(typeof type === 'string') {
      let cl = getClassFromName(type);
      obj = new cl();
    } else {
      obj = new type();
    }

    for(let i = 0; i < unauthorized.length && r; ++i) {
      let unauthorizedClass = getClassFromName(unauthorized[i]);
      if(unauthorizedClass === null) {
        console.error(unauthorized[i] + ' : Invalid unauthorized Class');
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

  constructor(props){
    super(props);
    this.aboutClick = this.aboutClick.bind(this);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
  }

  handleOutsideClick(e) {
    // ignore clicks on the component itself
    if (this.aboutContainer.contains(e.target)) {
      return
    }
    if (this.aboutButton.contains(e.target)) {
      this.aboutClick()
      return
    }
    toggle = false
    this.aboutContainer.style.display = 'none'
  }

  aboutClick() {
    if(!toggle) {
      toggle = !toggle
      this.aboutContainer.style.display = 'flex'
    } else {
      toggle = !toggle
      this.aboutContainer.style.display = 'none'
    }
  }

  render() {
    return (
      <div className='App' onClick={(e) => this.handleOutsideClick(e)}>
        <header className='App-header border-bottom'>
          <div className='App-logo-container'>
            <h1 className='App-logo'>Paperwork&nbsp;<sup className='textExponent'>2020</sup></h1>
            <a className='Git-logo' href='https://github.com/dragonbleapiece/Paperwork' target='_blank' rel='noopener noreferrer'><SVG src={icon_git}/></a>
          </div>
          <div className='about' ref={aboutButton => { this.aboutButton = aboutButton; }}>
            <SVG src={icon_info}/>
          </div>
        </header>
        <main>
          <div className='leftSide'>
              <div className='aboutContainer' ref={aboutContainer => { this.aboutContainer = aboutContainer; }}>
                <h2 className='aboutTitle'>Paperwork <sup className='textExponent'>2020</sup></h2>
                <a className='aboutLink' href='http://mobitool.free.fr/paper/ea' target='_blank' rel='noopener noreferrer'>State of the arts online</a>
                <p>Paperwork is an online software for research in art and in the field of computer and visual research. It is developed in the perspective of computer art practice in the context of art schools, colleges, high schools and so on. The application helps producing drawings in the philosophy of generative processes. It is concerned with patterns, polygons, repertories and grammars. Moreover, the interface enables the learning and the editing of algorithms and therefore the construction of simple computational processes. It also offers to export svg format that makes it compatible with the traditional vector work area (graphic design, pen plotter, laser cutting, ...).</p>
                <p>Paperwork’s main algorithm is based on Markov chain, an algorithm that was used by artists such as Frieder Nake (Germany), Hiroshi Kawano (Japan), Hervé Huitric and Monique Nahas (France) in early Computer Art. It is now heavily used in our digital environment (google page ranking, chatbots, physical phenomenon modeling, ...). It is also classified in the machine learning area of the computational field.</p>
                <p>The Paperwork web application is based on the previous software experiment Generic Images (2018). Paperwork’s project is developed thanks to IMAC-ESIPE training program in the University Gustave Eiffel.</p>
                <div className='aboutCredits'>
                <p>Software design team:</p>
                <p>Gaëtan Robillard with Nicolas Cusumano, Cécile Rousset, Vincent Schmid, Quentin Sedmi.</p>
                </div>
              </div>
              <Workspace/>
          </div>
            <div className='rightSide border-left'>
              <div className='editionMenu border-bottom'>
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
