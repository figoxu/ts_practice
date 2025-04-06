# TypeScript 配置管理器实现要点

## 1. 接口设计

### 基础配置接口 (BaseConfig)
```typescript
interface BaseConfig {
    readonly appName: string;    // 只读应用名称
    readonly version: string;    // 只读版本号
    debug?: boolean;            // 可选的调试模式
}
```

关键点：
- 使用 `readonly` 修饰符确保关键配置不可修改
- 使用可选属性 `?` 标记非必需配置项

### 数据库配置接口 (DatabaseConfig)
```typescript
interface DatabaseConfig {
    host: string;
    port: number;
    username: string;
    password: string;
}
```

### 完整应用配置接口 (AppConfig)
```typescript
interface AppConfig extends BaseConfig {
    database: DatabaseConfig;
    features: {
        [key: string]: boolean;
    };
    limits: {
        maxUsers: number;
        maxRequests: number;
    };
}
```

关键点：
- 使用接口继承扩展基础配置
- 使用索引签名定义动态特性开关
- 使用嵌套对象结构组织相关配置

## 2. 配置管理器类实现

### 核心特性
1. 泛型支持
```typescript
class ConfigManager<T extends BaseConfig>
```
- 通过泛型约束确保配置类型必须继承自BaseConfig

2. 私有属性保护
```typescript
private config: T;
private readonly readonlyKeys: (keyof BaseConfig)[] = ['appName', 'version'];
```
- 使用私有属性防止外部直接访问配置
- 维护只读键列表

### 主要方法

1. 获取配置
```typescript
public getConfig(): Readonly<T>
```
- 返回完整配置的只读副本
- 使用 `Object.freeze` 防止配置被修改

2. 获取特定配置项
```typescript
public get<K extends keyof T>(key: K): T[K]
```
- 使用泛型确保类型安全
- 支持获取任意配置项

3. 更新配置
```typescript
public update<K extends keyof T>(key: K, value: T[K]): void
```
- 防止只读属性被修改
- 类型安全的配置更新

4. 合并配置
```typescript
public merge(newConfig: Partial<T>): void
```
- 支持部分配置更新
- 使用展开运算符保持原有配置

5. 配置验证
```typescript
public validate(config: Partial<T> = this.config): boolean
```
- 验证必需配置项是否存在
- 支持验证部分配置

## 3. 最佳实践

1. 类型安全
- 使用TypeScript接口定义配置结构
- 利用泛型确保类型安全
- 使用只读修饰符保护关键配置

2. 封装性
- 私有属性保护内部状态
- 提供受控的配置访问方法
- 防止配置被意外修改

3. 灵活性
- 支持配置继承和扩展
- 允许部分配置更新
- 动态特性配置支持

4. 可维护性
- 清晰的接口定义
- 模块化的配置结构
- 类型提示和编译时检查

## 4. TypeScript 工具类型：Partial<T>

### 概念解释
- `Partial<T>` 是 TypeScript 内置的工具类型
- 它将类型 T 的所有属性变成可选的（optional）
- 主要用于处理部分更新场景

### 示例
```typescript
interface User {
    name: string;    // 必需属性
    age: number;     // 必需属性
}

// 转换后
type PartialUser = Partial<User>;
// 等价于：
interface PartialUser {
    name?: string;   // 可选属性
    age?: number;    // 可选属性
}
```

### 应用场景
- 配置合并时允许只更新部分属性
- API 请求时的部分更新操作
- 表单数据的渐进式填写
