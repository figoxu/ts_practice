import {randomIntegerInRange} from "../util"
import {gameCol, gameRow} from './map'
import {Snake} from "./Snake";

export class Food {
    x: number;
    y: number;

    constructor() {
        this.x = randomIntegerInRange(0, gameCol - 1)
        this.y = randomIntegerInRange(0, gameRow - 1)
    }

    change(snake: Snake) {
        const newX = randomIntegerInRange(0, gameCol - 1)
        const newY = randomIntegerInRange(0, gameRow - 1)

        const x = snake.head.x
        const y = snake.head.y
        const isRepeatHead = newX === x && newY === y

        const bodies = snake.bodies
        const isRepeatBody = bodies.some((body) => {
            return body.x === newX && body.y === newY
        })

        if (isRepeatHead || isRepeatBody) {
            this.change(snake)
        } else {
            this.x = newX
            this.y = newY
        }

    }
}