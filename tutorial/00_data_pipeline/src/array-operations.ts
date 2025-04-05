/**
 * 类型安全的数组操作函数集合
 */

/**
 * 将数组中的每个元素从类型 T 转换为类型 U
 * @param array 输入数组
 * @param transformer 转换函数
 * @returns 转换后的数组
 */
export function map<T, U>(array: T[], transformer: (item: T) => U): U[] {
    return array.map(transformer);
}

/**
 * 基于谓词函数过滤数组元素
 * @param array 输入数组
 * @param predicate 谓词函数
 * @returns 过滤后的数组
 */
export function filter<T>(array: T[], predicate: (item: T) => boolean): T[] {
    return array.filter(predicate);
}

/**
 * 将数组元素聚合为单个值
 * @param array 输入数组
 * @param reducer 归约函数
 * @param initialValue 初始值
 * @returns 聚合结果
 */
export function reduce<T, U>(array: T[], reducer: (accumulator: U, current: T) => U, initialValue: U): U {
    return array.reduce(reducer, initialValue);
} 