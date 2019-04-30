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
    DownloadNameSaved: "Untitled",
    DownloadSuffixNumber: {
      svg: 0,
      jpg: 0
    },
    DownloadSuffix: "",
    DownloadFormat: "jpg"
  }
  downloadImage = function(el) {

    let nb = this.state.DownloadSuffixNumber;
    let dname = this.state.DownloadName;
    nb[this.state.DownloadFormat] = nb[this.state.DownloadFormat]+1;
    this.setState({DownloadSuffixNumber: nb});
    this.setState({DownloadSuffix: "-" + (nb[this.state.DownloadFormat]+1)});

    if (this.state.DownloadName === this.state.DownloadNameSaved) {
      dname = (nb[this.state.DownloadFormat] === 1) ? this.state.DownloadName : this.state.DownloadName + "-" + nb[this.state.DownloadFormat];
      Canvas.savePaper(dname, this.state.DownloadFormat);     
    } else {
      this.setState({DownloadNameSaved: this.state.DownloadName});
      Canvas.savePaper(dname, this.state.DownloadFormat);
    }
    console.log("SUFFIX", nb[this.state.DownloadFormat], "NAME + FORMAT", dname + "." + this.state.DownloadFormat);
  }
    render() {
        return(
            <div className="save">
              <input
              className="save__name"
              type="text"
              value={this.state.DownloadName}
              onChange={(event) => {
                this.setState({DownloadSuffixNumber: {svg: 0, jpg: 0}, DownloadSuffix: "", DownloadName: event.target.value})
              }}
              onBlur={(event) => {
                let dname = (event.target.value === "") ? "Untitled" : event.target.value;
                this.setState({DownloadName: dname});
              }}
              />
              <span className="save__nameSuffixe">{this.state.DownloadSuffix}</span>
              <div className="save__format">
                <input id="save__jpg" type="radio" value="jpg" name="saveFormat" defaultChecked onChange={(event) => {if(event.target.checked) {this.setState({DownloadFormat: event.target.value})}}}/>
                <label htmlFor="save__jpg" className="save__formatItem button border-left">.jpg</label>
                <input id="save__svg" type="radio" value="svg" name="saveFormat" onChange={(event) => {if(event.target.checked) {this.setState({DownloadFormat: event.target.value})}}}/>
                <label htmlFor="save__svg" className="save__formatItem button border-left">.svg</label>
              </div>
              <a className="button save__button border-left" onClick={(event) => this.downloadImage(event.target)}>
                <SVG src={icon_save_alt}/>
              </a>
            </div>
        );
    }
}

export default Save;
