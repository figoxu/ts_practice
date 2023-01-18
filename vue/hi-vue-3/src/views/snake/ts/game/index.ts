import {GameControl} from "./GameControl";
import {IsLive, Map} from "../types";
import {initMap} from "./map";

let gameControl: GameControl;

export function initGame(map: Map, isLive: IsLive) {
    gameControl = new GameControl(initMap(map), isLive)
}


export function startGame() {
    gameControl.start();
}

export function replayGame() {
    gameControl.replay();
}

export function changeDirection(direction: string) {
    gameControl.snake.changeDirection(direction)
}


