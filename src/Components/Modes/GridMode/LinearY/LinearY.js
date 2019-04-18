import GridMode from '../GridMode';


/*Pencil*/
class LinearY extends GridMode {

  state = {
  };

  constructor(props) {
    super(props);
    this.className += " " + LinearY.className;
  }

  mode(sk, data) {
    const {rows, columns, callback} = data;

    var column = sk.width/columns;
    var row = sk.height/rows;

    for(var i = 0; i < columns; i++) {
      sk.push();
        sk.translate(column * i, 0);
    		for(var j = 0; j < rows; j++) {
          sk.push();
            sk.translate(0, j * row);
            if(callback) callback();
          sk.pop();
    		}
      sk.pop();
  	}
  }

}

LinearY.className = "LinearY";

export default LinearY;
