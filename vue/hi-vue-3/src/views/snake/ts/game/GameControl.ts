import {Snake} from "./Snake";
import {Food} from "./Food";
import {IsLive, Map} from "../types";
import {render, reset} from "./render";
import {addTicker, intervalTimer, stopTicker} from "../util";
import {lg} from "../util/log"

export class GameControl {
    snake: Snake;
    private _food: Food;
    private _map: Map;
    private _isLive: IsLive;

    constructor(map: Map, isLive: IsLive) {
        this._map = map
        this._isLive = isLive
        this._food = new Food()
        this.snake = new Snake()
    }

    start() {
        lg("start run")
        document.addEventListener('keydown', this.keydownHandler.bind(this))
        addTicker(this.handlerTicker.bind(this))
        this._isLive.value = 2
    }

    keydownHandler(event: KeyboardEvent) {
        this.snake.direction = event.key
    }

    private _timeInterval = 200;
    private _isMove = intervalTimer(this._timeInterval);

    handlerTicker(n: number) {
        if (this._isMove(n)) {
            try {
                this.snake.move(this._food);
            } catch (error: any) {
                this._isLive.value = 3;
                stopTicker();
            }
        }
        render(this._map, this.snake, this._food);
    }

    replay() {
        reset(this._map)
        this.snake.direction = 'Right';
        this.snake = new Snake();
        this._food = new Food();
        this._isLive.value = 2;
        stopTicker();
        addTicker(this.keydownHandler.bind(this))
    }
}