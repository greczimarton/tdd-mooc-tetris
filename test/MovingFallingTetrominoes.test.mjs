import { expect } from "chai";
import { Board } from "../src/Board.mjs";
import { Tetromino } from "../src/Tetromino.mjs";

function moveToRight(board) {
    for (let i = 0; i < 10; i++) {
        board.moveRight()
    }
}

function moveToLeft(board) {
    for (let i = 0; i < 10; i++) {
        board.moveLeft()
    }
}

function moveToDown(board) {
    for (let i = 0; i < 10; i++) {
        board.moveDown()
    }
}

describe("Moving Falling tetrominoes", () => {
    let board;
    beforeEach(() => {
        board = new Board(10, 6);
    });

    describe("Moving termonio", () => {
        it("a falling tetromino can be moved left", () => {
            board.drop(Tetromino.T_SHAPE);
            board.moveLeft()

            expect(board.toString()).to.equalShape(
                `...T......
                 ..TTT.....
                 ..........
                 ..........
                 ..........
                 ..........`
            );
        });

        it("a falling tetromino can be moved right", () => {
            board.drop(Tetromino.T_SHAPE);
            board.moveRight();

            expect(board.toString()).to.equalShape(

                `.....T....
                 ....TTT...
                 ..........
                 ..........
                 ..........
                 ..........`
            );
        });

        it("a falling tetromino can be moved down", () => {
            board.drop(Tetromino.T_SHAPE);
            board.moveDown();

            expect(board.toString()).to.equalShape(
                `..........
                 ....T.....
                 ...TTT....
                 ..........
                 ..........
                 ..........`
            );
        });
    });

    describe("Moving tetromino to the edge of the board", () => {
        it("it cannot be moved left beyond the board", () => {
            board.drop(Tetromino.T_SHAPE);
            moveToRight(board);

            expect(board.toString()).to.equalShape(
                `........T.
                 .......TTT
                 ..........
                 ..........
                 ..........
                 ..........`
            );
        });

        it("it cannot be moved right beyond the board", () => {
            board.drop(Tetromino.T_SHAPE);
            moveToLeft(board);

            expect(board.toString()).to.equalShape(
                `.T........
                 TTT.......
                 ..........
                 ..........
                 ..........
                 ..........`
            );
        });

        it("it cannot be moved down beyond the board (will stop falling)", () => {
            board.drop(Tetromino.T_SHAPE);
            moveToDown(board);

            expect(board.toString()).to.equalShape(
                `..........
                 ..........
                 ..........
                 ..........
                 ....T.....
                 ...TTT....`
            );
        });
    });

    describe("Cant move tetromino through another teromino", () => {
        it("it cannot be moved left through other blocks", () => {
            board.drop(Tetromino.T_SHAPE);
            moveToDown(board);
            board.drop(Tetromino.T_SHAPE);
            board.moveRight();
            board.moveRight();
            board.tick();
            board.tick();
            board.tick();
            board.moveLeft();

            expect(board.toString()).to.equalShape(
                `..........
                 ..........
                 ..........
                 ......T...
                 ....TTTT..
                 ...TTT....`
            );
        });

        it("it cannot be moved right through other blocks", () => {
            board.drop(Tetromino.T_SHAPE);
            moveToDown(board);
            board.drop(Tetromino.T_SHAPE);
            board.moveLeft();
            board.moveLeft();
            board.tick();
            board.tick();
            board.tick();
            board.moveRight();

            expect(board.toString()).to.equalShape(
                `..........
                 ..........
                 ..........
                 ..T.......
                 .TTTT.....
                 ...TTT....`
            );
        });

        it("it cannot be moved down through other blocks (will stop falling)", () => {
            board.drop(Tetromino.T_SHAPE);
            moveToDown(board);
            board.drop(Tetromino.T_SHAPE);
            moveToDown(board);

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
});
