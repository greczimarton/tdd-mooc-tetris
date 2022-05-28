export class Board {
  width;
  height;
  blocks;
  get oneIsFalling() {
    for (let i = 0; i < this.blocks.length; i++) {
      if (this.blocks[i].isFalling) return true;
    }
    return false;
  }

  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.blocks = new Array();
  }

  toString() {
    let board = "";
    for (let y = this.height; 0 < y; y--) {
      for (let x = 0; x < this.width; x++) {
        let currentCell = "";
        this.blocks.forEach((t) => {
          if (t.y == y && t.x == x) currentCell = t.color;
        });
        board += currentCell ? currentCell : ".";
      }
      board += "\n";
    }
    return board;
  }

  drop(block) {
    if (this.oneIsFalling) {
      throw "already falling";
    }

    block.x = Math.floor(this.width / 2);
    block.y = this.height;
    block.isFalling = true;
    this.blocks.push(block);
  }

  tick() {
    for (let i = 0; i < this.blocks.length; i++) {
      if (this.blocks[i].isFalling) this.blocks[i].y -= 1;
    }
  }
}
