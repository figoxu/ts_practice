import {Map, SnakeBodies, SnakeHead} from '../types'
import {Food} from './Food'
import {Snake} from "./Snake";

export function render(map: Map, snake: Snake, food: Food) {
    reset(map)
    _renderSnakeHead(map, snake.head)
    _renderSnakeBody(map, snake.bodies)
    _renderFood(map, food)
}

export function reset(map: Map) {
    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map[0].length; j++) {
            if (map[i][j] !== 0) {
                map[i][j] = 0
            }
        }
    }
}

function _renderSnakeBody(map: Map, bodies: SnakeBodies) {
    for (let i = 0; i < bodies.length; i++) {
        let body = bodies[i]
        let row = body.y
        let col = body.x
        map[row][col] = 1
    }
}

function _renderSnakeHead(map: Map, head: SnakeHead) {
    let row = head.y;
    let col = head.x;
    map[row][col] = 2
}

function _renderFood(map: Map, food: Food) {
    let row = food.y;
    let col = food.x;
    map[row][col] = -1
}

