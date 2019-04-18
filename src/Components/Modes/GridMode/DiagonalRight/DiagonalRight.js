import GridMode from '../GridMode';


/*Pencil*/
class DiagonalRight extends GridMode {

  state = {
  };

  constructor(props) {
    super(props);
    this.className += " " + DiagonalRight.className;
  }

  mode(sk, data) {
    const {rows, columns, callback} = data;

    var column = sk.width/columns;
    var row = sk.height/rows;

    for (var compteur = 0; compteur < columns; compteur++){
      for (var i = 0; i <= compteur; i++) {
        sk.push();
          sk.translate(column * i, (compteur-i) * row);
          if(callback) callback();
        sk.pop();
      }
    }

    for (var compteur = columns - 1; compteur > 0; compteur--){
      var i = columns-compteur;
      var j = rows - 1;
      while (i < columns) {
        sk.push();
          sk.translate(column * i, j * row);
          if(callback) callback();
        sk.pop();
        i+=1;
        j-=1;
      }
    }
  }

}

DiagonalRight.className = "DiagonalRight";

export default DiagonalRight;
