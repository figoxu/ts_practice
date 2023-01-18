import {GameControl} from "./GameControl";
import {IsLive, Map} from "../types";
import {initMap} from "./map";
import {lg} from "../util/log"

let gameControl: GameControl;

export function initGame(map: Map, isLive: IsLive) {
    gameControl = new GameControl(initMap(map), isLive)
}


export function startGame() {
    gameControl.start();
}

export function replayGame() {
    lg("重新开始")
    gameControl.replay();
}

export function changeDirection(direction: string) {
    gameControl.snake.changeDirection(direction)
}


