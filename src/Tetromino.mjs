import { RotatingShape } from "./RotatingShape.mjs"

export class Tetromino {
    static T_SHAPE = new Tetromino(null, null, 4,
        `.T.
         TTT
         ...`)

    static I_SHAPE = new Tetromino(null, null, 2,
        `.....
         .....
         IIII.
         .....
         .....`)

    static O_SHAPE = new Tetromino(null, null, 1,
        `.OO
         .OO
         ...`)

    orientations
    currentOrientationIndex

    constructor(orientations, index, numberOfOrientation, shape) {
        if (orientations != null && index != null) {
            this.orientations = orientations
            this.currentOrientationIndex = index
        }
        else {
            let rotShape = new RotatingShape(shape)
            this.numberOfOrientation = numberOfOrientation
            this.orientations = []
            this.orientations[0] = rotShape;
            for (let i = 1; i < numberOfOrientation; i++) {
                rotShape = rotShape.rotateRight();
                this.orientations[i] = rotShape
            }
            this.currentOrientationIndex = 0;
        }
    }

    rotateRight() {
        let index = this.currentOrientationIndex
        if (index + 1 > this.orientations.length - 1)
            index = 0
        else
            index += 1
        return new Tetromino(this.orientations, index, null, null)
    }

    rotateLeft() {
        let index = this.currentOrientationIndex
        if (index - 1 < 0)
            index = this.orientations.length - 1
        else
            index -= 1
        return new Tetromino(this.orientations, index, null, null);
    }

    toString() {
        return this.orientations[this.currentOrientationIndex].toString();
    }

    getShape() {
        return this.orientations[this.currentOrientationIndex].getShape();
    }
}
