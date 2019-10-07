import GridMode from '../GridMode';


/*Pencil*/
class LinearX extends GridMode {

  state = {
  };

  constructor(props) {
    super(props);
    this.className += " " + LinearX.className;
  }

  mode(sk, data) {
    const {rows, columns, callback, lines} = data;

    var column = sk.width/columns;
    var row = sk.height/rows;

    if(lines) {
      for(var i = 0; i < rows; i++) {
        sk.push();
          sk.translate(0, row * i);
          let line = sk.line(0, 0, sk.width, 0);
          sk.setPathTransform(line);
        sk.pop();
    	}

      for(var j = 0; j < columns; j++) {
        sk.push();
          sk.translate(j * column, 0);
          let line = sk.line(0, 0, 0, sk.height);
          sk.setPathTransform(line);
          if(callback) callback();
        sk.pop();
      }
    }

    if(callback) {
      for(var i = 0; i < rows; i++) {
        sk.push();
          sk.translate(0, row * i);
          for(var j = 0; j < columns; j++) {
            sk.push();
              sk.translate(j * column, 0);
              callback();
            sk.pop();
          }
        sk.pop();
    	}
    }
  }
}

LinearX.className = "LinearX";

export default LinearX;
