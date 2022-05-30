export class RotatingShape {
  shape;

  constructor(shapeString) {
    const data = shapeString.split("\n");
    this.shape = new Array(data.length);
    for (let i = 0; i < data.length; i++) {
      if (!this.shape[i]) this.shape[i] = [];
      data[i] = data[i].trim();
      for (let j = 0; j < data[i].length; j++) {
        this.shape[i].push(data[i][j]);
      }
    }
  }

  rotateRight() {
    const left = 0;
    const right = this.shape.length - 1;

    while (left < right) {
      for (let i = 0; i < right - 1; i++) {
        const top = left;
        const bottom = right;

        const temp = this.shape[top][left + i];

        this.shape[top][left + i] = this.shape[bottom - i][left];
        this.shape[bottom - i][left] = this.shape[bottom][right - i];
        this.shape[bottom][right - i] = this.shape[top + i][right];
        this.shape[top + i][right] = temp;
      }
    }


    return this;
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
}
