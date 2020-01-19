import Figure from './Figures/Figure';
import Rectangle from './Figures/Rectangle/Rectangle';
import Triangle from './Figures/Triangle/Triangle';
import Ellipse from './Figures/Ellipse/Ellipse';
import HHatching from './Figures/Hatching/HHatching/HHatching';
import VHatching from './Figures/Hatching/VHatching/VHatching';
import LOHatching from './Figures/Hatching/LOHatching/LOHatching';
import ROHatching from './Figures/Hatching/ROHatching/ROHatching';
import Placement from './Placement/Placement';
import Grid from './Placement/Grid/Grid';
import Markov from './Markov/Markov';
import Transform from './Transforms/Transform';
import Color from './Colors/Color';
import Void from './Void/Void';
import Red from './Colors/Red';
import Orange from './Colors/Orange';
import Yellow from './Colors/Yellow';
import Green from './Colors/Green';
import LightBlue from './Colors/LightBlue';
import Blue from './Colors/Blue';
import Black from './Colors/Black';
import White from './Colors/White';
import Series from './Series/Series';
import Symbol from './Figures/Symbols/Symbol';
import Arrow from './Figures/Symbols/Arrow/Arrow';
import Character from './Figures/Characters/Character';
import Number0 from './Figures/Characters/Number0';
import Number1 from './Figures/Characters/Number1';
import Random from './Input/Random/Random';
import Increment from './Input/Increment/Increment';
import SliderBox from './Input/SliderBox/SliderBox';


//GridModes
import LinearY from './Modes/GridMode/LinearY/LinearY';
import LinearX from './Modes/GridMode/LinearX/LinearX';
import DiagonalLeft from './Modes/GridMode/DiagonalLeft/DiagonalLeft';
import DiagonalRight from './Modes/GridMode/DiagonalRight/DiagonalRight';
import Orthogonal from './Modes/GridMode/Orthogonal/Orthogonal';
import SnailRight from './Modes/GridMode/SnailRight/SnailRight';

export function getClassFromName(name) {
  const lname = name.toLowerCase();
  switch(lname) {
    case('figure'):
      return Figure;
    case('rectangle'):
      return Rectangle;
    case('triangle'):
      return Triangle;
    case('ellipse'):
      return Ellipse;
    case('hhatching'):
      return HHatching;
    case('vhatching'):
      return VHatching;
    case('lohatching'):
      return LOHatching;
    case('rohatching'):
      return ROHatching;
    case('placement'):
      return Placement;
    case('grid'):
      return Grid;
    case('markov'):
      return Markov;
    case('transform'):
      return Transform;
    case('color'):
      return Color;
    case('red'):
      return Red;
    case('orange'):
      return Orange;
    case('yellow'):
      return Yellow;
    case('green'):
      return Green;
    case('lightblue'):
      return LightBlue;
    case('blue'):
      return Blue;
    case('black'):
      return Black;
    case('white'):
      return White;
    case('void'):
      return Void;
    case('linearx'):
      return LinearX;
    case('lineary'):
      return LinearY;
    case('diagonalleft'):
      return DiagonalLeft;
    case('diagonalright'):
      return DiagonalRight;
    case('orthogonal'):
      return Orthogonal;
    case('snailright'):
      return SnailRight;
    case('series'):
      return Series;
    case('arrow'):
      return Arrow;
    case('symbol'):
      return Symbol;
    case('character'):
      return Character;
    case('0'):
      return Number0;
    case('1'):
      return Number1
    case('sliderbox'):
      return SliderBox;
    case('increment'):
      return Increment;
    case('random'):
      return Random;
    default:
      //console.warn(lname);
      return null;
  }
}
