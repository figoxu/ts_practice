export * from './ticker'

export function intervalTimer(interval: number) {
    let t = 0;
    return (n: number) => {
        t += n
        if (t >= interval) {
            t = 0;
            return true;
        }
        return false;
    }
}

export function randomIntegerInRange(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
