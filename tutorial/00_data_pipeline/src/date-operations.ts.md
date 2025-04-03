# TypeScript 日期操作工具类中的类型定义说明

## 日期格式化中的字面量联合类型

在 `date-operations.ts` 中，我们看到如下类型定义：

```typescript
format: 'yyyy-MM-dd' | 'yyyy/MM/dd' | 'dd/MM/yyyy' | 'MM/dd/yyyy';
```

这是 TypeScript 中的字面量联合类型（Literal Union Types）的典型应用，具有以下特点：

1. **严格的类型限制**
   - 通过 `|` 符号将多个字面量类型组合成一个联合类型
   - 只允许使用这四种特定的日期格式字符串，其他格式将在编译时报错

2. **格式说明**
   - `yyyy-MM-dd`: 年-月-日（例如：2024-03-20）
   - `yyyy/MM/dd`: 年/月/日（例如：2024/03/20）
   - `dd/MM/yyyy`: 日/月/年（例如：20/03/2024）
   - `MM/dd/yyyy`: 月/日/年（例如：03/20/2024）

3. **代码提示优势**
   - IDE 可以提供精确的代码补全
   - 避免手动输入格式字符串时的错误
   - 在编译时即可发现格式错误

4. **类型安全**
   - 确保日期格式的一致性
   - 防止传入非预期的格式字符串
   - 提高代码的可维护性

## 使用示例

```typescript
// 正确使用
const options: DateFormatOptions = {
  format: 'yyyy-MM-dd'
};

// 错误使用（TypeScript 将报错）
const wrongOptions: DateFormatOptions = {
  format: 'yyyy.MM.dd' // 编译错误：不在允许的格式列表中
};
```
