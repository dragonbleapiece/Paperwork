import React, { Component } from 'react';
import shortid from 'shortid';
import DraggableCursor from './DraggableCursor'

//import Icons
import SVG from 'react-svg';
import next from '../../Icons/next.svg';
import unknown from '../../Icons/unknown.svg';

const WIDTH = 220;
const HEIGHT = 220;
const RADIUS = 100;

const getCirclePoint = (center = {x: 0, y: 0}, r = 1, elNumber = 3, index = 0) => {
  return {x: center.x + r * Math.cos(index * 2 * Math.PI / elNumber - Math.PI / 2), y: center.y + r * Math.sin(index * 2 * Math.PI / elNumber - Math.PI / 2)};
}

const getCirclePoints = (center = {x: 0, y: 0}, r = new Array(elNumber).fill(1), elNumber = 3) => {
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
    const center = {x: WIDTH / 2, y: HEIGHT / 2};
    const points = getCirclePoints(center, probas, elNumber);
    const outerPoints = getCirclePoints(center, new Array(elNumber).fill(maxRadius + 1), elNumber);
    const d = points.reduce((acc, point, index) => `${acc} ${index > 0 ? 'L ' : ''}${point.x} ${point.y}`, 'M') + 'Z';
    const outerD = outerPoints.reduce((acc, point, index) => `${acc} ${index > 0 ? 'L ' : ''}${point.x} ${point.y}`, 'M') + 'Z';
    const lines = points.map((point, index) => (<line key={index} x1={center.x} y1={center.y} x2={point.x} y2={point.y} className='Radar__Line'/>));

    const cursor = points.map((point, index) => {
      const angle = index * 2 * Math.PI / elNumber - Math.PI / 2;
      const radius = probas[index];
      const x = center.x + radius * Math.cos(angle);
      const y = center.y + radius * Math.sin(angle);
      const vertex = {x: center.x + maxRadius * Math.cos(angle), y: center.y + maxRadius * Math.sin(angle)};
      let vector = {x: center.x - vertex.x, y: center.y - vertex.y};
      vector.x = vector.x !== 0 || vector.y !== 0 ? vector.x / Math.max(Math.abs(vector.x), Math.abs(vector.y)) : vector.x;
      vector.y = vector.x !== 0 || vector.y !== 0 ? vector.y / Math.max(Math.abs(vector.x), Math.abs(vector.y)) : vector.y;
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

    return (
      <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox={`0 0 ${WIDTH} ${HEIGHT}`} className='Markov__Radar'>
        <path d={d} className='Radar__Shape'/>
        <path d={outerD} className='Radar__Outline'/>
        {lines}
        <circle cx={center.x} cy={center.y} r={2} className='Radar__Point Radar__Center'/>
        {cursor}
      </svg>
    );
  }

}

export default Radar;
