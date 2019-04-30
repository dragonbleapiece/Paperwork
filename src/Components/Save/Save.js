import React, { Component } from 'react';
import './Save.css';
import JSZip from 'jszip';
import {saveAs} from 'file-saver';

// import Components
import Canvas from '../../Components/Canvas/Canvas';
//import Icons
import SVG from 'react-svg';
import icon_save_alt from '../../Icons/save_alt.svg';
import icon_code from '../../Icons/code.svg';

function dataURItoBlob(dataURI) {
  // convert base64 to raw binary data held in a string
  // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
  var byteString = atob(dataURI.split(',')[1]);

  // separate out the mime component
  var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]

  // write the bytes of the string to an ArrayBuffer
  var ab = new ArrayBuffer(byteString.length);

  // create a view into the buffer
  var ia = new Uint8Array(ab);

  // set the bytes of the buffer to the correct values
  for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
  }

  // write the ArrayBuffer to a blob, and you're done
  var blob = new Blob([ab], {type: mimeString});
  return blob;

}

class Save extends Component {
  state = {
    DownloadName: "Untitled",
    DownloadNameSaved: "Untitled",
    DownloadSuffixNumber: {
      svg: 0,
      jpg: 0
    },
    DownloadSuffix: "",
    DownloadFormat: "jpg",
    zipNumber: 10
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

  downloadZip = function() {
    let zip = new JSZip();
    zip.file(this.state.DownloadName + ".txt", "By Paperwork\n");
    let img = zip.folder(this.state.DownloadName);
    for(let i = 0; i < this.state.zipNumber; ++i) {
      img.file(`${this.state.DownloadName}-${i}.${this.state.DownloadFormat}`, Canvas.getImageData(), {base64: true});
      Canvas.draw();
    }
    const self = this;
    zip.generateAsync({type:"blob"})
    .then(function(content) {
        saveAs(content, self.state.DownloadName+".zip");
    });
  }

    render() {
        return(
            <div className="save">
              <div className="button displayCode border-right" onClick={this.downloadZip.bind(this)}>
                <SVG src={icon_code}/>
              </div>
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
