import React, { Component } from 'react';
import './App.css';
import Canvas from '../../Components/Canvas/Canvas';
//import Icons
import SVG from 'react-svg'
import icon_save_alt from '../../Icons/save_alt.svg';
import icon_code from '../../Icons/code.svg';
// import Components
import Workspace from '../../Components/Workspace/Workspace';
// import Boxes
import {getClassFromName} from '../../Components/Index';

window.addClassToElement = function(name, target) {
  let cl = getClassFromName(name);
  target.addChild(cl);
  if(!(target instanceof Workspace)) {
    Workspace.forceUpdate();
  }
};

class App extends Component {
  state = {
    DownloadName: "Untitled",
    DownloadFormat: "jpg"
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

  render() {

    return (
      <div className="App">
        <header className="App-header border-bottom">
          <div className="App-logo">Paper&#123; &#125;</div>
        </header>
        <main>
            <Workspace>

            </Workspace>
            <div className="render border-left">
              <div className="editionMenu border-bottom">
                <div className="save">
                  <a className="button save__button border-right" onClick={(event) => this.downloadImage(event.target)}>
                    <SVG src={icon_save_alt}/>
                  </a>
                  <input className="save__name" type="text" value={this.state.DownloadName} onChange={(event) => {this.setState({DownloadName: event.target.value})}}/>
                  <div className="save__format">
                    <input id="save__jpg" type="radio" value="jpg" name="saveFormat" defaultChecked onChange={(event) => {if(event.target.checked) {this.setState({DownloadFormat: event.target.value})}}}/>
                    <label htmlFor="save__jpg" className="save__formatItem button border-left">.jpg</label>
                    <input id="save__svg" type="radio" value="svg" name="saveFormat" onChange={(event) => {if(event.target.checked) {this.setState({DownloadFormat: event.target.value})}}}/>
                    <label htmlFor="save__svg" className="save__formatItem button border-left">.svg</label>
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
