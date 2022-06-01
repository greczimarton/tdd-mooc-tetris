import _ from "lodash";

export class RotatingShape {
  shape;

  constructor(shapeData) {
    if (typeof shapeData === 'string') {
      const data = shapeData.split("\n");
      this.shape = new Array(data.length);
      for (let i = 0; i < data.length; i++) {
        if (!this.shape[i]) this.shape[i] = [];
        data[i] = data[i].trim();
        for (let j = 0; j < data[i].length; j++) {
          this.shape[i].push(data[i][j]);
        }
      }
    }
    else {
      this.shape = shapeData
    }
    Object.freeze(this);
  }

  /*
    0.0 => 0.2
    0.1 => 1.2
    0.2 => 2.2
    1.0 => 0.1
    1.1 => 1.1
    1.2 => 2.1
    2.0 => 0.0
    2.1 => 0.1
    2.2 => 0.2
  */
  rotateRight() {
    const shapeCopy = _.cloneDeep(this.shape);
    const dim = shapeCopy.length

    for (let row = 0; row < dim; row++) {
      for (let column = 0; column < dim; column++) {
        shapeCopy[column][dim - 1 - row] = this.shape[row][column]
      }
    }

    return new RotatingShape(shapeCopy);
  }

  /*
    0.0 => 2.0
    0.1 => 1.0
    0.2 => 0.0
    1.0 => 2.1
    1.1 => 1.1
    1.2 => 0.1
    2.0 => 0.0
    2.1 => 0.1
    2.2 => 0.2
  */
  rotateLeft() {
    //return this.rotateRight().rotateRight().rotateRight();
    const shapeCopy = _.cloneDeep(this.shape);
    const dim = shapeCopy.length

    for (let row = 0; row < dim; row++) {
      for (let column = 0; column < dim; column++) {
        shapeCopy[dim - 1 - column][row] = this.shape[row][column]
      }
    }

    return new RotatingShape(shapeCopy);
  }


  toString() {
    let shapeString = "";
    for (let i = 0; i < this.shape.length; i++) {
      for (let j = 0; j < this.shape[i].length; j++) {
        shapeString += this.shape[i][j];
      }
      shapeString += "\n";
    }
    return shapeString;
  }

  getShape() {
    return _.cloneDeep(this.shape);
  }
}
