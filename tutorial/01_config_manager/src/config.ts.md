# ConfigManager 配置说明

## 类型验证 - Zod

本项目使用 [Zod](https://github.com/colinhacks/zod) 进行配置验证。Zod 是一个 TypeScript-first 的模式声明和验证库：

- GitHub: https://github.com/colinhacks/zod
- 中文文档: https://github.com/colinhacks/zod/blob/master/README_ZH.md
- 特点：
  - 零依赖
  - 强大的类型推导
  - 体积小（~8kb minified + zipped）
  - TypeScript 和 JavaScript 双支持
  - 完整的中文文档

### Zod Schema 示例

```typescript
const databaseConfigSchema = baseConfigSchema.extend({
    host: z.string(),
    port: z.number().int().min(1).max(65535),  // 端口号验证
    username: z.string(),
    password: z.string(),
    poolSize: z.number().int().positive().optional()  // 可选的连接池大小
});
```

### 错误处理

```typescript
try {
    const validConfig = validateDatabaseConfig(someConfig);
    // 使用验证后的配置
} catch (error) {
    if (error instanceof z.ZodError) {
        // 处理验证错误
        console.error(error.errors);
    }
}
```

## env 配置说明

1. `env` 配置在 `defaultConfig` 中初始化为 `'development'`