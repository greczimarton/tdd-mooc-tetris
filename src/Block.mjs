export class Block {
  shape;
  row;
  column;
  offset;
  color;
  isFalling;

  constructor(data) {
    if (typeof (data) === "string") {
      this.shape = null;
      this.color = data;
      this.offset = 0;
    }
    else {
      this.shape = data;
      this.offset = 1;
    }
    this.x = 0;
    this.y = 0;
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
