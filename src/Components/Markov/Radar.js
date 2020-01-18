import React, { Component } from 'react';
import shortid from 'shortid';
import DraggableCursor from './DraggableCursor';
import Paper from 'paper';

//import Icons
import SVG from 'react-svg';
import next from '../../Icons/next.svg';
import unknown from '../../Icons/unknown.svg';

const WIDTH = 220;
const HEIGHT = 220;
const RADIUS = 100;

const getCirclePoint = (center = new Paper.Point(0, 0), r = 1, elNumber = 3, index = 0) => {
  return new Paper.Point(center.x + r * Math.cos(index * 2 * Math.PI / elNumber - Math.PI / 2), center.y + r * Math.sin(index * 2 * Math.PI / elNumber - Math.PI / 2));
}

const getCirclePoints = (center = new Paper.Point(0, 0), r = new Array(elNumber).fill(1), elNumber = 3) => {
  let points = [];
  for(let i = 0; i < elNumber; ++i) {
    points.push( getCirclePoint(center, r[i], elNumber, i) );
  }

  return [...points];
}


class Radar extends Component {

  render() {

    const probas = this.props.points.map((point) => (100 - point));
    const callback = this.props.callback;


    const elNumber = this.props.points.length;
    const maxRadius = RADIUS;
    const center = new Paper.Point(WIDTH / 2, HEIGHT / 2);
    const points = getCirclePoints(center, probas, elNumber);
    const pins = getCirclePoints(center, new Array(elNumber).fill(maxRadius), elNumber);
    const outerPoints = getCirclePoints(center, new Array(elNumber).fill(maxRadius + 1), elNumber);
    const d = points.reduce((acc, point, index) => `${acc} ${index > 0 ? 'L ' : ''}${point.x} ${point.y}`, 'M') + 'Z';
    const outerD = outerPoints.reduce((acc, point, index) => `${acc} ${index > 0 ? 'L ' : ''}${point.x} ${point.y}`, 'M') + 'Z';
    const lines = points.map((point, index) => (<line key={index} x1={center.x} y1={center.y} x2={point.x} y2={point.y} className='Radar__Line'/>));

    const cursor = points.map((point, index) => {
      const angle = index * 2 * Math.PI / elNumber - Math.PI / 2;
      const radius = probas[index];
      const x = center.x + radius * Math.cos(angle);
      const y = center.y + radius * Math.sin(angle);
      const vertex = new Paper.Point(center.x + maxRadius * Math.cos(angle), center.y + maxRadius * Math.sin(angle));
      const vector = new Paper.Point(center.x - vertex.x, center.y - vertex.y).normalize();

      return (
        <DraggableCursor
          cx={x}
          cy={y}
          r={6}
          step={1}
          vector={vector}
          minRadius={0}
          maxRadius={maxRadius}
          radius={radius}
          callback={(newRadius) => {
              const newProba = (maxRadius - newRadius);
              callback(newProba, index);
          }}
          key={index}
        />
      )
    });

    const landmarks = pins.map((point, index) => (
      <circle key={index} cx={point.x} cy={point.y} r={2} className='Radar__Point' onClick={() => {
        callback(0, index);
      }}>
        <title>0</title>
      </circle>
      /*<text x={point.x} y={point.y + 12} className='Radar__Text'>0</text>*/
    ));

    return (
      <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox={`0 0 ${WIDTH} ${HEIGHT}`} className='Markov__Radar'>
        <path d={outerD} className='Radar__Outline'/>
        <path d={d} className='Radar__Shape'/>
        {lines}
        <circle cx={center.x} cy={center.y} r={2} className='Radar__Point Radar__Center'>
          <title>100</title>
        </circle>
        <text x={center.x} y={center.y + 12} className='Radar__Text'>100</text>
        {landmarks}
        {cursor}
      </svg>
    );
  }

}

export default Radar;
