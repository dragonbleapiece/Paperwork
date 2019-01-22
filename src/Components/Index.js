import Figure from './Figures/Figure';
import Rectangle from './Figures/Rectangle/Rectangle';
import Triangle from './Figures/Triangle/Triangle';
import Ellipse from './Figures/Ellipse/Ellipse';
import Distribution from './Distributions/Distribution';
import Grid from './Distributions/Grid/Grid';
import Markov from './Markov/Markov';
import Transform from './Transforms/Transform';
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
    case('Distribution'):
      return Distribution;
    case('Grid'):
      return Grid;
    case('Markov'):
      return Markov;
    case('Transform'):
      return Markov;
    case('Color'):
      return Color;
    default:
      return null;
  }
}
