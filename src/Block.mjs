export class Block {
  shape;
  row;
  column;
  color;
  isFalling;

  constructor(data) {
    if (typeof (data) === "string") {
      this.shape = null;
      this.color = data;
    }
    else {
      this.shape = data;
    }
    this.isFalling = false;
  }

  toArray() {
    if (this.shape == null) {
      return [this.color];
    }

    return this.shape.getShape();
  }

  toString() {
    if (this.shape == null)
      return this.color
    return this.shape.toString()
  }
}
