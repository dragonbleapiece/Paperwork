import React, { Component } from 'react';
import './App.css';
import Canvas from '../../Components/Canvas/Canvas';
//import Icons
import SVG from 'react-svg'
import icon_save_alt from '../../Icons/save_alt.svg';
import icon_code from '../../Icons/code.svg';
// import Components
import Menu from '../../Components/Menu/Menu';
import Instructions from '../../Components/Instructions/Instructions';
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
    DownloadName: "Untitled.jpg"
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

    let MainLinks = [
      {title: "Markov chain", active: true},
      {title: "Cellular automaton", active: false}
    ];
    console.log(window);
    return (
      <div className="App">
        <header className="App-header border-bottom">
          <div className="App-logo">Paper&#123; &#125;</div>
          <Menu links={MainLinks}></Menu>
        </header>
        <main>
            <Instructions>
              <Grid columns="10" rows="10" />
              <Red />
              <Rectangle width="50" height="5" />
            </Instructions>
            <div className="render border-left">
              <div className="editionMenu border-bottom">
                <div className="save">
                  <a className="button save__button border-right" href="" download={this.state.DownloadName} onClick={(event) => this.downloadImage(event.target)}>
                    <SVG src={icon_save_alt}/>
                  </a>
                  <input className="save__name" type="text" value={this.state.DownloadName} onChange={(event) => {this.setState({DownloadName: event.target.value})}}/>
                  <div className="save__format">
                    <input className="button" type="radio" />
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
