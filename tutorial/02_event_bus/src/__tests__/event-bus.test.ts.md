# Jest 测试技巧：模拟 console.log

## jest.fn() 的作用
`jest.fn()` 是 Jest 测试框架提供的一个核心功能，用于创建模拟函数（mock function）。它允许我们：
- 追踪函数的调用
- 验证函数的调用参数
- 自定义函数的返回值

## 实际应用示例
在测试中模拟 console.log：
```typescript
let consoleOutput: string[] = [];
console.log = jest.fn((...args) => {
    consoleOutput.push(args.join(' '));
});
```

这段代码的作用是：
1. 创建一个数组来存储控制台输出
2. 将原始的 console.log 替换为模拟函数
3. 模拟函数会将所有输出内容保存到数组中
4. 便于后续在测试中验证输出内容

## 使用场景
- 验证日志输出
- 测试错误处理
- 确保正确的信息被记录
- 避免测试时在控制台产生噪音
