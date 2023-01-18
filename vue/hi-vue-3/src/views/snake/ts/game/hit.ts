import {SnakeBodies, SnakeHead} from '../types'
import {gameCol, gameRow} from "./map"

export function hitFence(head: SnakeHead, direction: string) {
    let isHitFence = false;
    switch (direction) {
        case 'ArrowUp':
        case 'Up':
            isHitFence = head.y - 1 < 0;
            break;
        case 'ArrowDown':
        case 'Down':
            isHitFence = head.y + 1 > gameRow - 1;
            break;
        case 'ArrowLeft':
        case 'Left':
            isHitFence = head.x - 1 < 0;
            break;
        case 'ArrowRight':
        case 'Right':
            isHitFence = head.x + 1 > gameCol - 1;
            break
        default:
            break
    }
    return isHitFence
}

export function hitSelf(head: SnakeHead, bodies: SnakeBodies) {
    const x = head.x;
    const y = head.y;
    const snakeBodies = bodies;
    const isHitSelf = snakeBodies.some((body) => {
        return body.x === x && body.y === y;
    })
    return isHitSelf
}



