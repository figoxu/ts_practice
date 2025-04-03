# TypeScript 可选属性（Optional Properties）说明

在 TypeScript 中，`?:` 语法用于表示可选属性（Optional Properties）。这是一个非常实用的特性，让我们可以定义某些属性是可选的，而不是必需的。

## 语法说明

```typescript
interface SplitOptions {
  delimiter: string;   // 必需属性
  limit?: number;      // 可选属性
}
```

## 特点

1. **可选性**：带有 `?:` 的属性是可选的，意味着在使用接口时可以不提供该属性
2. **类型安全**：即使是可选属性，TypeScript 也会严格检查其类型
3. **运行时值**：如果不提供该属性，其值将是 `undefined`

## 使用示例

```typescript
// 完整使用所有属性
const fullOptions: SplitOptions = {
  delimiter: ",",
  limit: 3
};

// 省略可选属性也是合法的
const minimumOptions: SplitOptions = {
  delimiter: ","
};
```

## 实际应用场景

在 `StringProcessor` 类中，`limit` 作为可选参数的设计允许：

1. 当需要限制分割结果数量时，可以指定 `limit`
2. 当不需要限制时，可以忽略该参数
3. 提供了更灵活的 API 设计

## 最佳实践

1. 使用可选属性时，应当在代码中处理属性不存在的情况
2. 可选属性通常应该有合理的默认行为
3. 文档中应该清晰说明可选属性的默认行为
