import { Block } from "./Block.mjs";
import { Tetromino } from "./Tetromino.mjs";
import _ from "lodash";

export class Board {
  width;
  height;
  blocks;
  array;



  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.blocks = new Array();
    this.array = [];
    this.initBoardArray()
  }

  updateBoard() {
    this.initBoardArray()
    for (const block in this.blocks) {
      this.writeBlockIntoArray(this.blocks[block])
    }
  }

  initBoardArray() {
    for (let y = this.height - 1; 0 <= y; y--) {
      this.array[y] = [];
      for (let x = 0; x < this.width; x++) {
        this.array[y][x] = "."
      }
    }
    return this.array
  }

  writeBlockIntoArray(block) {
    const heightCoord = this.height - 1;
    const blockShape = block.toArray();
    for (let row = 0; row < blockShape.length; row++) {
      for (let column = 0; column < blockShape.length; column++) {
        if (blockShape[row][column] != ".") {
          this.array[(heightCoord - block.row) + row][block.column + column] = blockShape[row][column];
        }
      }
    }
  }

  drop(dropped) {
    if (this.hasFalling()) {
      throw "already falling";
    }

    dropped = dropped instanceof Tetromino ? new Block(dropped) : dropped;

    const offset = dropped instanceof Block ? Math.floor(dropped.toArray().length / 2) : 0;

    dropped.column = Math.floor((this.width - 1) / 2) - offset;
    dropped.row = this.height - 1;
    dropped.isFalling = true;
    this.blocks.push(dropped);

    this.updateBoard();
  }

  hasFalling() {
    for (let i = 0; i < this.blocks.length; i++) {
      if (this.blocks[i].isFalling) return true;
    }
    return false;
  }

  tick() {
    for (let i = 0; i < this.blocks.length; i++) {
      if (this.blocks[i].isFalling == false)
        continue
      if (this.testBlockNewPostion(this.blocks[i], "DOWN")) {
        this.blocks[i].row -= 1;
      } else {
        this.blocks[i].isFalling = false;
      }
    }
    this.updateBoard();
  }

  moveLeft() {
    if (this.hasFalling() == false) {
      return
    }

    const block = this.getFallingBlock();

    if (this.testBlockNewPostion(block, "LEFT")) {
      block.column -= 1;
    }
    this.updateBoard();
  }

  moveRight() {
    if (this.hasFalling() == false) {
      return
    }

    const block = this.getFallingBlock();

    if (this.testBlockNewPostion(block, "RIGHT")) {
      block.column += 1;
    }
    this.updateBoard();
  }

  moveDown() {
    if (this.hasFalling() == false) {
      return
    }

    const block = this.getFallingBlock();

    if (this.testBlockNewPostion(block, "DOWN")) {
      block.row -= 1;
    } else {
      block.isFalling = false;
    }

    this.updateBoard();
  }

  getFallingBlock() {
    for (let i = 0; i < this.blocks.length; i++) {
      if (this.blocks[i].isFalling) {
        return this.blocks[i]
      }
    }
  }

  testBlockNewPostion(block, direction) {
    const blockBodyCoordinates = this.getBlockBodyCoordinates(block)

    for (let i = 0; i < blockBodyCoordinates.length; i++) {
      const coordinate = _.cloneDeep(blockBodyCoordinates[i]);
      switch (direction) {
        case "LEFT":
          coordinate.column -= 1
          break;
        case "RIGHT":
          coordinate.column += 1
          break;
        case "DOWN":
          coordinate.row -= 1
          break;
        default:
          throw "Invalid direction"
      }

      if (coordinate.row < 0) {
        return false;
      }

      if (_.find(blockBodyCoordinates, t => t.row == coordinate.row && t.column == coordinate.column)) {
        continue
      }

      if (this.array[this.array.length - 1 - coordinate.row][coordinate.column] != ".") {
        return false;
      }
    }

    return true;
  }

  getBlockBodyCoordinates(block) {
    const blockBodyCoordinates = []

    const blockArray = block.toArray();
    for (let row = 0; row < blockArray.length; row++) {
      for (let column = 0; column < blockArray.length; column++) {
        if (blockArray[row][column] == ".") {
          continue
        }

        blockBodyCoordinates.push({
          row: block.row - row,
          column: block.column + column
        })
      }
    }

    return blockBodyCoordinates
  }

  toString() {
    return this.arrayToString()
  }

  arrayToString() {
    let string = ""
    for (let row = 0; row < this.height; row++) {
      for (let column = 0; column < this.width; column++) {
        string += this.array[row][column]
      }
      string += "\n";
    }
    return string;
  }
}
