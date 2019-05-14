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
import Translate from './Transforms/Translate/Translate';
import Scale from './Transforms/Scale/Scale';
import Rotate from './Transforms/Rotate/Rotate';
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


//GridModes
import LinearY from './Modes/GridMode/LinearY/LinearY';
import LinearX from './Modes/GridMode/LinearX/LinearX';
import DiagonalLeft from './Modes/GridMode/DiagonalLeft/DiagonalLeft';
import DiagonalRight from './Modes/GridMode/DiagonalRight/DiagonalRight';
import Orthogonal from './Modes/GridMode/Orthogonal/Orthogonal';
import SnailRight from './Modes/GridMode/SnailRight/SnailRight';

export function getClassFromName(name) {
  switch(name) {
    case('Figure'):
      return Figure;
    case('Rectangle'):
      return Rectangle;
    case('Triangle'):
      return Triangle;
    case('Ellipse'):
      return Ellipse;
    case('HHatching'):
      return HHatching;
    case('VHatching'):
      return VHatching;
    case('LOHatching'):
      return LOHatching;
    case('ROHatching'):
      return ROHatching;
    case('Placement'):
      return Placement;
    case('Grid'):
      return Grid;
    case('Markov'):
      return Markov;
    case('Transform'):
      return Transform;
    case('Color'):
      return Color;
    case('Red'):
      return Red;
    case('Orange'):
      return Orange;
    case('Yellow'):
      return Yellow;
    case('Green'):
      return Green;
    case('LightBlue'):
      return LightBlue;
    case('Blue'):
      return Blue;
    case('Black'):
      return Black;
    case('White'):
      return White;
    case('Translate'):
      return Translate;
    case('Scale'):
      return Scale;
    case('Rotate'):
      return Rotate;
    case('Void'):
      return Void;
    case('LinearX'):
      return LinearX;
    case('LinearY'):
      return LinearY;
    case('DiagonalLeft'):
      return DiagonalLeft;
    case('DiagonalRight'):
      return DiagonalRight;
    case('Orthogonal'):
      return Orthogonal;
    case('SnailRight'):
      return SnailRight;
    case('Series'):
      return Series;
    case('Arrow'):
      return Arrow;
    case('Symbol'):
      return Symbol;
    case('Character'):
      return Character;
    case('0'):
      return Number0;
    case('1'):
      return Number1
    default:
      return null;
  }
}
