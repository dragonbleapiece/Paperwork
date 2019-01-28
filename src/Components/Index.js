import Figure from './Figures/Figure';
import Rectangle from './Figures/Rectangle/Rectangle';
import Triangle from './Figures/Triangle/Triangle';
import Ellipse from './Figures/Ellipse/Ellipse';
import Placement from './Placement/Placement';
import Grid from './Placement/Grid/Grid';
import Markov from './Markov/Markov';
import Transform from './Transforms/Transform';
import Translate from './Transforms/Translate/Translate';
import Rotate from './Transforms/Rotate/Rotate';
import Color from './Transforms/Colors/Color';
import Red from './Transforms/Colors/Red';
import Blue from './Transforms/Colors/Blue';
import Green from './Transforms/Colors/Green';

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
    case('Placement'):
      return Placement;
    case('Grid'):
      return Grid;
    case('Markov'):
      return Markov;
    case('Transform'):
      return Markov;
    case('Color'):
      return Color;
    case('Red'):
      return Red;
    case('Blue'):
      return Blue;
    case('Green'):
      return Green;
    case('Translate'):
      return Translate;
    case('Rotate'):
      return Rotate;
    default:
      return null;
  }
}
