import type {Map} from "../types/index"

const clientWidth = document.documentElement.clientWidth - 20;
const clientHeight = document.documentElement.clientHeight - 40;

export const gameRow = clientHeight > 700 ? Math.floor(clientHeight / 54) : Math.floor(clientHeight / 34);

export const gameCol = clientWidth > 700 ? Math.floor(clientWidth / 54) : Math.floor(clientWidth / 34);

export function initMap(map: Map) {
    for (let i = 0; i < gameRow; i++) {
        const arr: Array<number> = [];
        for (let j = 0; j < gameCol; j++) {
            arr.push(0)
        }
        map.push(arr)
    }
    return map
}

