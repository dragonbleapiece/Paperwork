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

export default Index = [
  {
    type: Figure,
    elements: [
      {type: Rectangle},
      {type: Triangle},
      {type: Ellipse}
    ]
  },
  {
    type: Color,
    elements: [
      {type: Red},
      {type: Blue},
      {type: Green}
    ]
  },
  {
    type: Markov
  },
  {
    type: Distribution,
      elements: [
        {type: Grid}
      ]
  }
];
