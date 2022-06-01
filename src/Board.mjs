import { Block } from "./Block.mjs";
import { Tetromino } from "./Tetromino.mjs";

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
    let array = this.initBoardArray();
    for (const block in this.blocks) {
      array = this.writeBlockIntoArray(this.blocks[block], array)
    }

    return this.arrayToString(array)


    /*
    for (let y = this.height - 1; 0 <= y; y--) {
      for (let x = 0; x < this.width; x++) {
        let currentCell = "";
        this.blocks.forEach((t) => {
          if (t.y == y && t.x == x) {
            currentCell = t.toString();
          }
        });
        board += currentCell ? currentCell : ".";
      }
      board += "\n";
    }
    return board;
    */
  }

  initBoardArray() {
    let array = []
    for (let y = this.height - 1; 0 <= y; y--) {
      array[y] = [];
      for (let x = 0; x < this.width; x++) {
        array[y][x] = "."
      }
    }
    return array
  }

  writeBlockIntoArray(block, array) {
    const heightCoord = this.height - 1;
    const blockShape = block.toArray();
    for (let row = 0; row < blockShape.length; row++) {
      for (let column = 0; column < blockShape.length; column++) {
        array[(heightCoord - block.row) + row][block.column + column] = blockShape[row][column];
      }
    }
    return array;
  }

  arrayToString(array) {
    let string = ""
    for (let row = 0; row < this.height; row++) {
      for (let column = 0; column < this.width; column++) {
        string += array[row][column]
      }
      string += "\n";
    }
    return string;
  }

  drop(dropped) {
    if (this.hasFalling()) {
      throw "already falling";
    }
    if (dropped instanceof Tetromino) {
      dropped = new Block(dropped)
    }

    dropped.column = Math.floor((this.width - 1) / 2) - dropped.offset;
    dropped.row = this.height - 1;
    dropped.isFalling = true;
    this.blocks.push(dropped);
  }

  tick() {
    for (let i = 0; i < this.blocks.length; i++) {
      const highestInColumn = this.getHighestPointInColumn(this.blocks[i].column);
      if (this.blocks[i].row == highestInColumn) this.blocks[i].isFalling = false;
      if (this.blocks[i].isFalling && this.blocks[i].row - 1 >= highestInColumn) {
        this.blocks[i].row -= 1;
      }
    }
  }

  getHighestPointInColumn(column) {
    let highest = 0;

    if (this.blocks.length == 0) return highest;
    const blocksInColumn = this.blocks.filter(
      (t) => t.column == column && t.isFalling == false
    );
    for (let i = 0; i < blocksInColumn.length; i++) {
      if (this.blocks[i].x == column && this.blocks[i].row > highest);
      highest = this.blocks[i].row + 1;
    }
    return highest;
  }
}
