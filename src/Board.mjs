export class Board {
  width;
  height;
  blocks;

  hasFalling() {
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
    for (let y = this.height - 1; 0 <= y; y--) {
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
    if (this.hasFalling()) {
      throw "already falling";
    }

    block.x = Math.floor(this.width / 2);
    block.y = this.height - 1;
    block.isFalling = true;
    this.blocks.push(block);
  }

  tick() {
    for (let i = 0; i < this.blocks.length; i++) {
      const highestInColumn = this.getHighestPointInColumn(this.blocks[i].x);
      if (this.blocks[i].y == highestInColumn) this.blocks[i].isFalling = false;
      if (this.blocks[i].isFalling && this.blocks[i].y - 1 >= highestInColumn) {
        this.blocks[i].y -= 1;
      }
    }
  }

  getHighestPointInColumn(column) {
    let highest = 0;

    if (this.blocks.length == 0) return highest;
    const blocksInColumn = this.blocks.filter(
      (t) => t.x == column && t.isFalling == false
    );
    for (let i = 0; i < blocksInColumn.length; i++) {
      if (this.blocks[i].x == column && this.blocks[i].y > highest);
      highest = this.blocks[i].y + 1;
    }
    return highest;
  }
}
