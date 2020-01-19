import React, { Component } from 'react';
import './Canvas.css';
import PropTypes from 'prop-types';
import Paper from 'paper';

const DEFAULTSTYLE = {
  fillColor: new Paper.Color(0, 0, 0, 1),
  strokeColor: new Paper.Color(0, 0, 0, 1),
  strokeWidth: 0,
  scale: new Paper.Size(1, 1),
  translate: new Paper.Point(0, 0),
  rotate: 0
}

class Canvas extends Component {

  /*Singleton*/
  static _instance;
  static _PaperScope;

  static getImageData(svg = false) {
    if(Canvas._instance !== undefined) {
      return Canvas._instance.getImageData(svg);
    }
  }

  static toBlob(callback, mimeType = 'image/png', qualityArgument = 0.80) {
    if(Canvas._instance !== undefined) {
      return Canvas._instance.toBlob(callback, mimeType, qualityArgument);
    }
  }

  static draw() {
    if(Canvas._instance !== undefined) {
      Canvas._instance.draw();
    }
  }

  static attach(obj) {
    if(Canvas._instance !== undefined) {
      Canvas._instance.attach(obj);
    }
  }

  static detach(obj) {
    if(Canvas._instance !== undefined) {
      Canvas._instance.detach(obj);
    }
  }

  state = {
    function: undefined,
    width: 0,
    height: 0
  };

  constructor(props) {
    if(Canvas._instance !== undefined) {
      return Canvas._instance;
    }
    super(props);
    this.currentFont = null;
    this.observers = [];
    this.reset();

    Canvas._instance = this;
  }

  get lastStyle() {
    return this._styles[this._styles.length - 1];
  }

  get fillColor() {
    return this.lastStyle.fillColor;
  }

  get strokeColor() {
    return this.lastStyle.strokeColor;
  }

  get strokeWidth() {
    return this.lastStyle.strokeWidth;
  }

  get scaleValue() {
    return this._styles.reduce((acc, {scale}) => acc.multiply(scale), new Paper.Size(1, 1));
  }

  get translateValue() {
    return this._styles.reduce((acc, {translate}) => acc.add(translate), new Paper.Point(0, 0));
  }

  get rotateValue() {
    return this._styles.reduce((acc, {rotate}) => acc + rotate, 0);
  }

  get width() {
    return this.state.width;
  }

  get height() {
    return this.state.height;
  }

  pop() {
    this._styles = this._styles.slice(0, -1);
  }

  push() {
    const last = this._styles[this._styles.length - 1];
    this._styles = [...this._styles, {
      ...DEFAULTSTYLE,
      strokeWidth: last.strokeWidth,
      strokeColor: last.strokeColor,
      fillColor: last.fillColor
    }];
  }

  setfilename(filename, ext = undefined) {
    this.filename = filename;
    if(ext !== undefined) this.extension = ext;
  }

  CalcCanvasSize() {
    let canvasWidth = window.innerWidth*0.5-60;
    let canvasHeight = window.innerHeight-180;
    let CanvasSize = (canvasWidth < canvasHeight) ? canvasWidth : canvasHeight;
    this.setState({width: CanvasSize, height: CanvasSize});
  }

  init() {
    let self = this;

    let canvas = document.getElementById('canvas');
    Canvas._PaperScope = Paper.setup(canvas);
    console.log(Canvas._PaperScope)
    Paper.view.onResize = (e) => {
      this.windowResized(canvas);
      this.componentDidUpdate();
    }
    window.addEventListener('resize', (e) => {
      this.windowResized(canvas);
      this.componentDidUpdate();
    });
    Paper.view.autoUpdate = false;
    window.updateWorkspace();
  }

  fill(color) {
    this.lastStyle.fillColor = color;
  }

  rect(x, y, width, height) {
    let rect = new Paper.Path.Rectangle(new Paper.Point(x, y), new Paper.Size(width, height));
    this.setPathStyle(rect);
    return rect;
  }

  ellipse(x, y, width, height) {
    let ellipse = new Paper.Path.Ellipse({
      point: new Paper.Point(x, y),
      size: new Paper.Size(width, height)
    });
    this.setPathStyle(ellipse);
    return ellipse;
  }

  line(x1, y1, x2, y2) {
    let line = new Paper.Path.Line(new Paper.Point(x1, y1), new Paper.Point(x2, y2));
    this.setPathStyle(line);
    return line;
  }

  triangle(x, y, width) {
    let triangle = new Paper.Path.RegularPolygon(new Paper.Point(x + width / 2, y + width / 2), 3, width / 2);
    this.setPathStyle(triangle);
    return triangle;
  }

  translate(x, y = x) {
    this.lastStyle.translate = new Paper.Point(x, y)
  }

  scale(x, y = x) {
    this.lastStyle.scale = new Paper.Size(x, y)
  }

  rotate(angle) {
    this.lastStyle.rotate = angle;
  }

  noStroke() {
    this.strokeWeight(0);
  }

  strokeWeight(weight) {
    this.lastStyle.strokeWidth = weight;
  }

  stroke(color) {
    if(this.lastStyle.strokeWidth === 0) this.strokeWeight(1);
    this.lastStyle.strokeColor = color;
  }

  text(text, x, y) {
    let textObject = new Paper.PointText(new Paper.Point(x, y));
    textObject.fontFamily = 'Space Grotesk';
    textObject.content = text;
    textObject.justification = 'center';
    this.setPathStyle(textObject);
    return textObject;
  }

  textSize(size) {

  }

  group() {
    return new Paper.Group();
  }

  path(segments) {
    let path = new Paper.Path(segments);
    this.setPathStyle(path);
    return path;
  }

  setPathStyle(path) {
    path.style = {
      fillColor: this.fillColor,
      strokeWidth: this.strokeWidth,
      strokeColor: this.strokeColor
    };
  }

  setPathTransform(path) {
    console.log(this.rotateValue);
    path.rotate(-this.rotateValue);
    path.scale(this.scaleValue.width, this.scaleValue.height);
    path.translate(this.translateValue);
  }

  color(r, g, b, a) {
    return new Paper.Color(r, g, b, a);
  }

  sendDraw(f) {
    this.setState({
      function: f
    });
  }

  resetDraw() {
    this.setState({
      function: undefined
    });
  }

  windowResized(sk) {
    this.CalcCanvasSize();
    this.resizeCanvas(sk);
  }

  resizeCanvas(sk) {
    sk.width = this.state.width
    sk.height = this.state.height
  }

  draw() {
    Paper.project.clear();
    this.reset();
    let f = this.state.function;
    if(f !== undefined) {
      f(this);
    }
    Paper.view.draw();
  }

  componentDidMount() {
    this.CalcCanvasSize();
    this.init();
  }

  reset() {
    this._styles = [{...DEFAULTSTYLE}];
    this.notifyAll();
  }

  attach(obj) {
    this.observers.push(obj);
  }

  detach(obj) {
    this.observers = this.observers.filter((observer) => observer !== obj);
  }

  notifyAll() {
    this.observers.forEach((observer) => {
      observer.receiveNotification();
    });
  }

  componentDidUpdate() {
    this.draw();
  }

  getImageData(svg = false) {
    if(svg) {
      return Canvas._PaperScope.project.exportSVG({
        asString: true,
        matchShapes: true,
        bounds: new Paper.Rectangle(new Paper.Point(0, 0), new Paper.Size(this.width, this.height))
      });
    } else {
      const canvas = Canvas._PaperScope.project.view.element;
      return canvas.toDataURL('image/png').replace(/^data:image\/(png|jpg);base64,/, '');
    }
  }

  toBlob(callback, mimeType = 'image/png', qualityArgument = 0.80) {
    const canvas = Canvas._PaperScope.project.view.element;
    canvas.toBlob(callback, mimeType, qualityArgument);
  }


  render() {
    return (
      <div className="canvasContainer">
        <div id="renderer">
          <canvas id="canvas" width={this.state.width} height={this.state.height} resize="true"/>
        </div>
      </div>
    );
  }
}

Canvas._instance = undefined;
Canvas._PaperScope = undefined;

/*PropTypes*/
Canvas.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  cells: PropTypes.number
}

export default Canvas;
