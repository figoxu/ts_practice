import {SnakeBodies, SnakeHead} from "../types"
import {Food} from "./Food"
import {hitFence, hitSelf} from "./hit"
import {breadcrumbItemProps} from "element-plus";


export class Snake {
    bodies: SnakeBodies;
    head: SnakeHead;

    direction: string;

    constructor() {
        this.direction = 'Right';
        this.head = {
            x: 1,
            y: 0,
            status: 2,
        }
        this.bodies = []
    }

    checkEat(food: Food) {
        if (this.head.x === food.x && this.head.y === food.y) {
            // food.change(this);
            this.bodies.unshift({
                x: food.x,
                y: food.y,
                status: 1,
            })
        }
    }

    move(food: Food) {
        if (hitFence(this.head, this.direction) || hitSelf(this.head, this.bodies)) {
            throw new Error("游戏结束")
        }
        const headX = this.head.x;
        const headY = this.head.y;
        const bodyX = this.bodies[this.bodies.length - 1].x;
        const bodyY = this.bodies[this.bodies.length - 1].y;
        switch (this.direction) {
            case 'ArrowUp':
            case 'Up':
                if (headY - 1 === bodyY && headX === bodyX) {
                    moveDown(this.head, this.bodies)
                    this.direction = "Down"
                    return
                }
                moveUp(this.head, this.bodies)
                break;
            case "ArrowDown":
            case "Down":
                if (headY + 1 === bodyY && headX === bodyX) {
                    moveUp(this.head, this.bodies)
                    this.direction = "Up"
                    return
                }
                moveDown(this.head, this.bodies)
                break
            case "ArrowLeft":
            case "Left":
                if (headX + 1 == bodyX && headY === bodyY) {
                    moveRight(this.head, this.bodies)
                    this.direction = "Right"
                    return
                }
                moveLeft(this.head, this.bodies)
                break
            case "ArrowRight":
            case "Right":
                if (headX - 1 === bodyX && headY === bodyY) {
                    moveLeft(this.head, this.bodies)
                    this.direction = "Left"
                    return
                }
                moveRight(this.head, this.bodies)
                break
            default:
                break
        }
        this.checkEat(food)
    }

    changeDirection(direction: string) {
        if (direction === "Left" && this.direction != "Left" && this.direction != "Right") {
            this.direction = direction
            return
        }
        if (direction === "Right" && this.direction != "Left" && this.direction != "Right") {
            this.direction = direction
            return
        }
        if (direction === 'Up' && this.direction !== 'Up' && this.direction !== 'Down') {
            this.direction = 'Up';
            return;
        }
        if (direction === 'Down' && this.direction !== 'Up' && this.direction !== 'Down') {
            this.direction = 'Down';
            return;
        }
    }
}

function moveUp(head: SnakeHead, bodies: SnakeBodies) {
    head.y--;
    bodies.push({
        x: head.x,
        y: head.y + 1,
        status: 1,
    })
    bodies.shift()
}

function moveDown(head: SnakeHead, bodies: SnakeBodies) {
    head.y++;
    bodies.push({
        x: head.x,
        y: head.y - 1,
        status: 1,
    })
    bodies.shift()
}

function moveRight(head: SnakeHead, bodies: SnakeBodies) {
    head.x++;
    bodies.push({
        x: head.x - 1,
        y: head.y,
        status: 1,
    })
    bodies.shift()
}

function moveLeft(head: SnakeHead, bodies: SnakeBodies) {
    head.x--
    bodies.push({
        x: head.x + 1,
        y: head.y,
        status: 1,
    })
    bodies.shift()
}



