import React, { Component } from 'react';
import './Save.css';
// import Components
import Canvas from '../../Components/Canvas/Canvas';
//import Icons
import SVG from 'react-svg';
import icon_save_alt from '../../Icons/save_alt.svg';

class Save extends Component {
  state = {
    DownloadName: "Untitled",
    DownloadFormat: "svg"
  }
  downloadImage = function(el) {
    Canvas.savePaper(this.state.DownloadName, this.state.DownloadFormat);
  }

    render() {
        return(
            <div className="save">
              <input className="save__name" type="text" value={this.state.DownloadName} onChange={(event) => {this.setState({DownloadName: event.target.value})}}/>
              <div className="save__format">
                <input id="save__svg" type="radio" value="svg" name="saveFormat" defaultChecked onChange={(event) => {if(event.target.checked) {this.setState({DownloadFormat: event.target.value})}}}/>
                <label htmlFor="save__svg" className="save__formatItem button border-left">.svg</label>
                <input id="save__jpg" type="radio" value="jpg" name="saveFormat" onChange={(event) => {if(event.target.checked) {this.setState({DownloadFormat: event.target.value})}}}/>
                <label htmlFor="save__jpg" className="save__formatItem button border-left">.jpg</label>
              </div>
              <a className="button save__button border-left" onClick={(event) => this.downloadImage(event.target)}>
                <SVG src={icon_save_alt}/>
              </a>
            </div>
        );
    }
}

export default Save;
