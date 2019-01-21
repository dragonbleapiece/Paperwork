import React, { Component } from 'react';
import MaterialIcon, {colorPalette} from 'material-icons-react';
import './App.css';
import Canvas from '../../Components/Canvas/Canvas';
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
  constructor(props){
    super(props);
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
              <Grid columns="10" rows="10" />
              <Red />
              <Rectangle width="50" height="5" />
            </Instructions>
            <div className="Render">
              <div className="EditionMenu">
               <MaterialIcon icon="dashboard" />
              </div>        
                <Canvas/>
            </div>
        </main>
      </div>
    );
  }
}

export default App;
