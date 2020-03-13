## Paperwork

https://dragonbleapiece.github.io/Paperwork/

### What is Paperwork ?

Paperwork is an online software for research in art and in the field of computer and visual research. It is developed in the perspective of computer art practice in the context of art schools, colleges, high schools and so on. The application helps producing drawings in the philosophy of generative processes. It is concerned with patterns, polygons, repertories and grammars. Moreover, the interface enables the learning and the editing of algorithms and therefore the construction of simple computational processes. It also offers to export svg format that makes it compatible with the traditional vector work area (graphic design, pen plotter, laser cutting, ...).

Paperwork’s main algorithm is based on Markov chain, an algorithm that was used by artists such as Frieder Nake (Germany), Hiroshi Kawano (Japan), Hervé Huitric and Monique Nahas (France) in early Computer Art. It is now heavily used in our digital environment (google page ranking, chatbots, physical phenomenon modeling, ...). It is also classified in the machine learning area of the computational field.

The Paperwork web application is based on the previous software experiment Generic Images (2018). Paperwork’s project is developed thanks to [IMAC-ESIPE](https://www.ingenieur-imac.fr) training program in the University Gustave Eiffel. Made in [React](https://reactjs.org) and [Paper.js](http://paperjs.org).

### How does Paper work ?

Right click on anything you can and add shapes or organizing elements.

![Demo](/pictures/workspace.gif)

### Elements List

* Basic Shapes
  * Rectangle / Square
  * Triangle
  * Ellipse / Circle
* Hatching
  * Horizontal
  * Vertical
  * Right Oblique
  * Left Oblique
* Characters
  * Zero 0
  * One 1
* Arrow
* Void *(To be used in Grid)*

### Inputs

There are 3 types of input for Transformations Parameters.
* Value : Ponctual
* Increment : From a to b with step s
  * Limited : Stop at extremum
  * Loop : Restart from a or b (depending on decrement or increment state)
  * Loop-Reverse : Alternate between decrement and increment
* Random : Random value in a given range

In a Grid, the increment value is calculated from the previous drawing. The random value is gotten at each drawing.
In a Recursion, only the value of the ThisBox drawn at level 1 is kept.

![Increment](/pictures/Increment.PNG)

### Organizing Elements List

#### Grid

Allow to dispatch elements in a Square Grid

![Grid](/pictures/Grid.PNG)

##### Modes

Exist 6 Grid Distribution Modes :

Linear X |  Linear Y | Diagonal Left 
------------ | ------------- | -------------
![LinearX](/pictures/LinearX.png) | ![LinearY](/pictures/LinearY.png) | ![DiagonalLeft](/pictures/DiagonalLeft.png)


Diagonal Right | Orthogonal | Snail Right
------------- | ------------- | -------------
![DiagonalRight](/pictures/DiagonalRight.png) | ![Orthogonal](/pictures/Orthogonal.png) | ![SnailRight](/pictures/SnailRight.png)
  

#### Markov *(only in Grid)*

![Markov](/pictures/Markov.PNG)

Briefly, Markov Serie is a random base serie with states. For each state, there are probabilities for state transitions.

![MarkovParam](/pictures/MarkovParam.PNG)

In this exemple, after a Circle, there are 90% chance to obtain a Circle, 5% chance to obtain a Square and 5% chance for a Triangle.

Paperwork use a Random Behavior to generate different pictures based on the same model.

#### Recursion

![Recursion](/pictures/Recursion.PNG)

Paperwork implements recursive drawing with another element named ThisBox. ThisBox refers to its parent box -that is a Recursion box- and can only be placed inside of it. Changing its transformation parameters give results like fractals.
You can vary the number of recursions and uncheck the Restrained Level Recursion box.

##### Number of Recursions

Recursion Number | 1 | 2 | 3 | 4 | 5
--- | --- | --- | --- | --- | --- |
Result | ![RecursionLevel1](/pictures/RecursionLevel1.png) | ![RecursionLevel1](/pictures/RecursionLevel2.png) | ![RecursionLevel1](/pictures/RecursionLevel3.png) | ![RecursionLevel1](/pictures/RecursionLevel4.png) | ![RecursionLevel1](/pictures/RecursionLevel5.png)

##### Recursion Restriction
![RecursionWithRestriction](/pictures/RecursionWithRestriction.PNG) | ![RecursionWithoutRestriction](/pictures/RecursionWithoutRestriction.PNG)
--- | ---

In sum, an interesting mistake.

#### Save

You can save your work in JPG or SVG. The SVG is here to permit modifications on the image without information loss.

The library [Paper.js](http://paperjs.org) is mainly used in this purpose.

##### Working Exemple

![Poster](/pictures/Affiche.png)

___

*Note :* You might suppose that the name Paperwork comes from the name of the library used. In fact, it is purely coincidence. At the beginning of the project, it was the [P5.js](https://p5js.org) library that was used. The name refers to go back to basis for doing Art.

## For development

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

