import React, { Component } from 'react';
import './App.css';
import Canvas from '../../Components/Canvas/Canvas';
//import Icons
import SVG from 'react-svg'
import icon_save_alt from '../../Icons/save_alt.svg';
import icon_code from '../../Icons/code.svg';
import icon_info from '../../Icons/info.svg';
// import Components
import Workspace from '../../Components/Workspace/Workspace';
// import Boxes
import {getClassFromName} from '../../Components/Index';

window.getClassFromName = getClassFromName;

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
      console.log(unauthorized);
      let unauthorizedClass = getClassFromName(unauthorized[i]);
      if(unauthorizedClass === null) {
        console.error(unauthorized[i] + " : Invalid unauthorized Class");
        continue;
      }
      r = r && !(obj instanceof unauthorizedClass);
    }
  }

  return r;
}

let toggle = false;

class App extends Component {
  state = {
    DownloadName: "Untitled",
    DownloadFormat: "svg"
  }
  constructor(props){
    super(props);
  }

  downloadImage = function(el) {
    //var canvas = document.getElementById("defaultCanvas0");
    //var image = canvas.toDataURL("image/jpeg");
    //el.href = image;
    Canvas.savePaper(this.state.DownloadName, this.state.DownloadFormat);
  }

  aboutClick() {
    let aboutDisplay;
    if(!toggle) {
      toggle = !toggle;
      aboutDisplay = {display: 'flex'};
     } else {
      toggle = !toggle;
      aboutDisplay = {display: 'none'};
     };
    this.setState({aboutDisplay: aboutDisplay});
  }

  render() {

    return (
      <div className="App">
        <header className="App-header border-bottom">
          <div className="App-logo">Paper&nbsp;&#123;&nbsp;&nbsp;&nbsp;&#125;</div>
          <div className="about" onClick={this.aboutClick.bind(this)}>
            <SVG src={icon_info}/>
          </div>
          {/* <div className="aboutContainerBackground"></div> */}
        </header>
        <main>
            <div className="leftSide">
              <div className="aboutContainer" style={this.state.aboutDisplay}>
                <span>Blablabla</span>
              </div>
              <Workspace>

              </Workspace>
          </div>
            <div className="rightSide border-left">
              <div className="editionMenu border-bottom">
                <div className="save">
                  <a className="button save__button border-right" onClick={(event) => this.downloadImage(event.target)}>
                    <SVG src={icon_save_alt}/>
                  </a>
                  <input className="save__name" type="text" value={this.state.DownloadName} onChange={(event) => {this.setState({DownloadName: event.target.value})}}/>
                  <div className="save__format">
                    <input id="save__svg" type="radio" value="svg" name="saveFormat" defaultChecked onChange={(event) => {if(event.target.checked) {this.setState({DownloadFormat: event.target.value})}}}/>
                    <label htmlFor="save__svg" className="save__formatItem button border-left">.svg</label>
                    <input id="save__jpg" type="radio" value="jpg" name="saveFormat" onChange={(event) => {if(event.target.checked) {this.setState({DownloadFormat: event.target.value})}}}/>
                    <label htmlFor="save__jpg" className="save__formatItem button border-left">.jpg</label>
                  </div>
                </div>
                <div className="button displayCode border-left">
                  <SVG src={icon_code}/>
                </div>
              </div>
                <Canvas/>
            </div>
        </main>
      </div>
    );
  }
}

export default App;
