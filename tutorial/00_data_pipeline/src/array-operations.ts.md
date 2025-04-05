# 类型安全的数组操作

本模块提供了一组类型安全的数组操作函数，包括 `map`、`filter` 和 `reduce`。这些函数是对 JavaScript 原生数组方法的类型安全包装。

## 函数说明

### map<T, U>

将数组中的每个元素从类型 T 转换为类型 U。

```typescript
const numbers = [1, 2, 3, 4, 5];
const doubled = map(numbers, (n) => n * 2);
// 结果: [2, 4, 6, 8, 10]

const words = ['hello', 'world'];
const upperCased = map(words, (str) => str.toUpperCase());
// 结果: ['HELLO', 'WORLD']
```

### filter<T>

基于谓词函数过滤数组元素。

```typescript
const numbers = [1, 2, 3, 4, 5, 6];
const evenNumbers = filter(numbers, (n) => n % 2 === 0);
// 结果: [2, 4, 6]

const words = ['hello', 'world', 'typescript', 'js'];
const longWords = filter(words, (word) => word.length > 4);
// 结果: ['hello', 'world', 'typescript']
```

### reduce<T, U>

将数组元素聚合为单个值。

```typescript
const numbers = [1, 2, 3, 4, 5];
const sum = reduce(numbers, (acc, curr) => acc + curr, 0);
// 结果: 15

const words = ['Hello', 'World'];
const sentence = reduce(words, (acc, curr) => `${acc} ${curr}`, '').trim();
// 结果: 'Hello World'

// 使用不同的累加器类型
const numberStrings = reduce(
    numbers,
    (acc, curr) => [...acc, curr.toString()],
    [] as string[]
);
// 结果: ['1', '2', '3', '4', '5']
``` 