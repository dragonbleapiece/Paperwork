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
import Color from './Transforms/Colors/Color';
import Void from './Void/Void';
import Blue from './Transforms/Colors/Blue';
import Cyan from './Transforms/Colors/Cyan';


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
    case('Blue'):
      return Blue;
    case('Cyan'):
      return Cyan;
    case('Translate'):
      return Translate;
    case('Scale'):
      return Scale;
    case('Rotate'):
      return Rotate;
    case('Void'):
      return Void;
    default:
      return null;
  }
}
