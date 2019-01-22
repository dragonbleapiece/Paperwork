import React, { Component } from 'react';
import './App.css';
import Canvas from '../../Components/Canvas/Canvas';
//import Icons
import SVG from 'react-svg'
import icon_save_alt from '../../Icons/save_alt.svg';
import icon_code from '../../Icons/code.svg';
// import Components
import ContextMenu from '../../Components/ContextMenu/ContextMenu';
import Workspace from '../../Components/Workspace/Workspace';

import Rectangle from '../../Components/Figures/Rectangle/Rectangle';
import Triangle from '../../Components/Figures/Triangle/Triangle';
import Ellipse from '../../Components/Figures/Ellipse/Ellipse';

import Grid from '../../Components/Grid/Grid';
import Markov from '../../Components/Markov/Markov';

import Blue from '../../Components/Transforms/Colors/Blue';
import Green from '../../Components/Transforms/Colors/Green';
import Red from '../../Components/Transforms/Colors/Red';


class App extends Component {
  state = {
    DownloadName: "Untitled",
    DownloadFormat: "jpg"
  }
  constructor(props){
    super(props);
  }

  downloadImage = function(el) {
    var canvas = document.getElementById("defaultCanvas0");
    var image = canvas.toDataURL("image/jpeg");
    el.href = image;
    console.log("Hey !");
  }

  render() {

    return (
      <div className="App">
        <header className="App-header border-bottom">
          <div className="App-logo">Paper&#123; &#125;</div>
        </header>
        <main>
            <Workspace>
              <Grid rows="10" columns="10" />
            </Workspace>
            <div className="render border-left">
              <div className="editionMenu border-bottom">
                <div className="save">
                  <a className="button save__button border-right" href="" download={this.state.DownloadName+"."+this.state.DownloadFormat} onClick={(event) => this.downloadImage(event.target)}>
                    <SVG src={icon_save_alt}/>
                  </a>
                  <input className="save__name" type="text" value={this.state.DownloadName} onChange={(event) => {this.setState({DownloadName: event.target.value})}}/>
                  <div className="save__format">
                    <input id="save__jpg" type="radio" value="jpg" name="saveFormat" defaultChecked onChange={(event) => {if(event.target.checked) {this.setState({DownloadFormat: event.target.value})}}}/>
                    <label for="save__jpg" className="save__formatItem button border-left">.jpg</label>
                    <input id="save__svg" type="radio" value="svg" name="saveFormat" onChange={(event) => {if(event.target.checked) {this.setState({DownloadFormat: event.target.value})}}}/>
                    <label for="save__svg" className="save__formatItem button border-left">.svg</label>
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
