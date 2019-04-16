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

    this.aboutClick = this.aboutClick.bind(this);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);

    this.state = {
      aboutVisible: 'none'
    };
  }

  aboutClick() {
    if (!this.state.aboutVisible) {
      // attach/remove event handler
      document.addEventListener('click', this.handleOutsideClick, false);
    } else {
      document.removeEventListener('click', this.handleOutsideClick, false);
    }

    this.setState(prevState => ({
      aboutVisible: !prevState.aboutVisible,
    }));
  }

  handleOutsideClick(e) {
    // ignore clicks on the component itself
    if (this.aboutContainer.contains(e.target)) {
      return;
    }
    if (this.aboutButton.contains(e.target)) {
      this.aboutClick()
      return;
    }
    toggle = false
    this.setState ({
      aboutVisible: 'none'
    })
  }


  aboutClick() {
    //console.log(this.state.aboutVisible)
    let aboutVisible = 'none'
    if(!toggle) {
      toggle = !toggle
      aboutVisible = 'flex'
    } else {
      toggle = !toggle
      aboutVisible = 'none'
    }
    console.log(aboutVisible)
    this.setState ({
       aboutVisible: aboutVisible
    })

  }

  render() {
    //console.log(this.state.aboutVisible)
    return (
      <div className="App" onClick={(e) => this.handleOutsideClick(e)}>
        <header className="App-header border-bottom">
          <h1 className="App-logo">Paperwork&nbsp;<sup className="textExponent">2019</sup></h1>
          <div className="about" ref={aboutButton => { this.aboutButton = aboutButton; }}>
            <SVG src={icon_info}/>
          </div>
        </header>
        <main>
          <div className="leftSide">
              <div className="aboutContainer" ref={aboutContainer => { this.aboutContainer = aboutContainer; }} style={{display: this.state.aboutVisible}}>
                <h2 className="aboutTitle">PaperWork <sup className="textExponent">2019</sup></h2>
                <a className="aboutLink" href="http://mobitool.free.fr/paper/ea" target="_blank">State of the arts online</a>
                <p>Paperwork is an online software for research in art and in the field of computer
                and visual research. It is developped in the perspective of computer art practice in
                the context of art schools, colleges, high schools and so on. The application helps
                producing drawings in the philosophy of generative processes. It is concerned with
                patterns, polygons, repertories and grammars. Moreover, the interface enables
                the learning and the editing of algorithms and therefore the construction of simple
                computational processes. It also offers to export svg format that makes it compatible
                with the traditionnal vector work area (graphic design, pen plotter, laser cutting, ...).</p>
                <p>Paperwork’s main algorithm is based on Markov chain, an algorithm that was used
                by artists such as Frieder Nake, Hiroshi Kawano, Hervé Huitric and Monique Nahas
                in early computer art. It is now heavily used in our digital environment (google page
                ranking, chatbots, physical phenomenom modeling, ...). It is also classified in the
                machine learning area of the computational field.</p>
                <p>The Paperwork web application is based on the previsous software experiment
                Generic Images (2018). Paperwork’s project is developped thanks to IMACESIPE
                Training program in the University Paris-Est Marne-la-Vallée.</p>
                <div className="aboutCredits">
                <p>Software design team :</p>
                <p>Gaëtan Robillard with Nicolas Cusumano, Cécile Rousset, Vincent Schmid, Quentin Sedmi.</p>
                </div>
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
