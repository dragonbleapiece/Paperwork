import GridMode from '../GridMode';


/*Pencil*/
class DiagonalLeft extends GridMode {

  state = {
  };

  constructor(props) {
    super(props);
    this.className += " " + DiagonalLeft.className;
  }

  mode(sk, data) {
    const {rows, columns, callback} = data;

    var column = sk.width/columns;
    var row = sk.height/rows;

    for (let compteur = 0; compteur < columns; compteur++){
      let i = columns - 1;
      let j = compteur;
      while(j >= 0){
        sk.push();
          sk.translate(column * i, j * row);
          if(callback) callback();
        sk.pop();
        i-=1;
        j-=1;
      }
    }

    for (let compteur = columns-1; compteur > 0; compteur--){
      let i = compteur - 1;
      let j = rows - 1;
      while (i >= 0) {
        sk.push();
          sk.translate(column * i, j * row);
          if(callback) callback();
        sk.pop();
        i-=1;
        j-=1;
      }
    }

  }

}

DiagonalLeft.className = "DiagonalLeft";

export default DiagonalLeft;
