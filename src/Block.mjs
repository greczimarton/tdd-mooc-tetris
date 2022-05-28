export class Block {
  x;
  y;
  color;
  isFalling;

  constructor(color) {
    this.color = color;
    this.x = 0;
    this.y = 0;
    this.isFalling = false;
  }
}
