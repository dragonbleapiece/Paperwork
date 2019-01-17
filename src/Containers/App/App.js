import React, { Component } from 'react';
import './App.css';
import Canvas from '../../Components/Canvas/Canvas';
// import Components
import Menu from '../../Components/Menu/Menu';
import Instructions from '../../Components/Instructions/Instructions';
import Rectangle from '../../Components/Rectangle/Rectangle';
import Triangle from '../../Components/Triangle/Triangle';
import Ellipse from '../../Components/Ellipse/Ellipse';
import Grid from '../../Components/Grid/Grid';
import Markov from '../../Components/Markov/Markov';


class App extends Component {
  constructor(props){
    super(props);
    this.CalcCanvasSize();
  }

  CalcCanvasSize() {
    let canvasWidth = window.innerWidth*0.5-60;
    let canvasHeight = window.innerHeight-180;
    this.CanvasSize = (canvasWidth < canvasHeight) ? canvasWidth : canvasHeight;
  }

  render() {

    let MainLinks = [
      {title: "Markov chain", active: true},
      {title: "Cellular automaton", active: false}
    ];
    console.log(window);
    return (
      <div className="App">
        <header className="App-header">
          <div className="App-logo">Paper&#123; &#125;</div>
          <Menu links={MainLinks}></Menu>
        </header>
        <main>
            <Instructions>
              <Grid columns="20" rows="10"/>
              <Markov>
                <Rectangle width="10" height="10" />
                <Triangle width="10" height="10" />
              </Markov>
            </Instructions>
            <div className="Render">
              <div className="EditionMenu"></div>
              <div className="CanvasContainer">
                <Canvas width={this.CanvasSize} height={this.CanvasSize} cells="20"/>
              </div>
            </div>
        </main>
      </div>
    );
  }
}

export default App;
