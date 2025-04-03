/**
 * 数字处理操作集合
 */

/**
 * 计算数字数组的总和
 * @param numbers 输入的数字数组
 * @returns 数组元素的总和
 */
export function sum(numbers: number[]): number {
    return numbers.reduce((acc, curr) => acc + curr, 0);
}

/**
 * 计算数字数组的平均值
 * @param numbers 输入的数字数组
 * @returns 数组元素的平均值
 * @throws 如果数组为空，抛出错误
 */
export function average(numbers: number[]): number {
    if (numbers.length === 0) {
        throw new Error('Cannot calculate average of empty array');
    }
    return sum(numbers) / numbers.length;
}

/**
 * 找出数组中的最大值
 * @param numbers 输入的数字数组
 * @returns 数组中的最大值
 * @throws 如果数组为空，抛出错误
 */
export function max(numbers: number[]): number {
    if (numbers.length === 0) {
        throw new Error('Cannot find maximum of empty array');
    }
    return Math.max(...numbers);
}

/**
 * 找出数组中的最小值
 * @param numbers 输入的数字数组
 * @returns 数组中的最小值
 * @throws 如果数组为空，抛出错误
 */
export function min(numbers: number[]): number {
    if (numbers.length === 0) {
        throw new Error('Cannot find minimum of empty array');
    }
    return Math.min(...numbers);
} 