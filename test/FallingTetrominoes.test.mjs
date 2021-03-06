import { expect } from "chai";
import { Board } from "../src/Board.mjs";
import { Tetromino } from "../src/Tetromino.mjs";

function fallToBottom(board) {
  for (let i = 0; i < 10; i++) {
    board.tick();
  }
}

describe("Falling tetrominoes", () => {
  let board;
  beforeEach(() => {
    board = new Board(10, 6);
  });

  it("start from the top middle", () => {
    board.drop(Tetromino.T_SHAPE);

    expect(board.toString()).to.equalShape(
      `....T.....
       ...TTT....
       ..........
       ..........
       ..........
       ..........`
    );
  });

  it("drop correctly once", () => {
    board.drop(Tetromino.T_SHAPE);
    board.tick()

    expect(board.toString()).to.equalShape(
      `..........
       ....T.....
       ...TTT....
       ..........
       ..........
       ..........`
    );
  });

  it("drop correctly twice", () => {
    board.drop(Tetromino.T_SHAPE);
    board.tick()
    board.tick()

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ....T.....
       ...TTT....
       ..........
       ..........`
    );
  });

  it("drop correctly thrice", () => {
    board.drop(Tetromino.T_SHAPE);
    for (let i = 0; i < 3; i++) {
      board.tick()
    }

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ....T.....
       ...TTT....
       ..........`
    );
  });

  it("drop correctly four times", () => {
    board.drop(Tetromino.T_SHAPE);
    for (let i = 0; i < 4; i++) {
      board.tick();
    }

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ..........
       ....T.....
       ...TTT....`
    );
  });

  it("stop when they hit the bottom", () => {
    board.drop(Tetromino.T_SHAPE);
    fallToBottom(board);

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ..........
       ....T.....
       ...TTT....`
    );
  });

  it("stop when they land on another block", () => {
    board.drop(Tetromino.T_SHAPE);
    fallToBottom(board);
    board.drop(Tetromino.T_SHAPE);
    fallToBottom(board);

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ....T.....
       ...TTT....
       ....T.....
       ...TTT....`
    );
  });
});
