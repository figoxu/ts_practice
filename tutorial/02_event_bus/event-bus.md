# TypeScript 事件总线实现说明

## 1. 核心类型定义 (types.ts)

### 1.1 事件处理器类型
```typescript
export type EventHandler<T = any> = (payload: T) => void | Promise<void>;
```
这是事件处理器的基本类型，它：
- 接受一个泛型参数 T 作为事件数据类型
- 返回 void 或 Promise<void>，支持同步和异步处理
- 默认类型为 any，但在实际使用时会被具体事件类型约束

### 1.2 事件优先级
```typescript
export enum Priority {
    LOW = 0,
    NORMAL = 1,
    HIGH = 2,
}
```
通过枚举定义三个优先级级别，数字越大优先级越高。

### 1.3 订阅者接口
```typescript
export interface Subscriber<T = any> {
    handler: EventHandler<T>;
    priority: Priority;
    once?: boolean;
}
```
描述事件订阅者的结构：
- handler: 事件处理函数
- priority: 处理优先级
- once: 是否为一次性订阅

### 1.4 中间件类型
```typescript
export type Middleware<T = any> = (
    payload: T,
    next: (payload: T) => Promise<void>
) => Promise<void>;
```
中间件采用洋葱模型设计：
- 接收当前事件数据和下一个中间件函数
- 支持异步处理
- 可以修改或包装事件数据

## 2. 事件总线实现 (EventBus.ts)

### 2.1 核心数据结构
```typescript
private subscribers: Map<keyof T, Subscriber<any>[]> = new Map();
private middlewares: Middleware[] = [];
```
- subscribers: 存储事件名到订阅者列表的映射
- middlewares: 存储中间件列表

### 2.2 事件注册方法
```typescript
on<K extends keyof T>(
    event: K,
    handler: EventHandler<T[K]>,
    priority: Priority = Priority.NORMAL
): void
```
注册事件处理器的核心逻辑：
1. 确保事件订阅者列表存在
2. 创建新的订阅者对象
3. 按优先级排序存储

### 2.3 事件触发机制
```typescript
async emit<K extends keyof T>(event: K, payload: T[K]): Promise<void>
```
事件触发的处理流程：
1. 构建中间件处理链
2. 执行所有中间件
3. 按优先级顺序调用事件处理器
4. 处理一次性订阅的清理

## 3. 中间件实现 (middleware.ts)

### 3.1 日志中间件
```typescript
export const loggerMiddleware: Middleware = async (payload, next) => {
    console.log(`[Event] Payload:`, payload);
    const startTime = Date.now();
    await next(payload);
    const endTime = Date.now();
    console.log(`[Event] Completed in ${endTime - startTime}ms`);
};
```
记录事件处理的开始、结束和耗时。

### 3.2 错误处理中间件
```typescript
export const errorHandlerMiddleware: Middleware = async (payload, next) => {
    try {
        await next(payload);
    } catch (error) {
        console.error('[Event Error]', error);
        throw error;
    }
};
```
统一的错误捕获和处理。

### 3.3 追踪中间件
```typescript
export const tracingMiddleware: Middleware = async (payload, next) => {
    const traceId = Math.random().toString(36).substring(7);
    console.log(`[Trace: ${traceId}] Event started`);
    await next({
        ...payload,
        _traceId: traceId
    });
    console.log(`[Trace: ${traceId}] Event ended`);
};
```
为事件添加追踪ID，方便调试和监控。

## 4. 使用示例 (demo.ts)

### 4.1 事件类型定义
```typescript
interface MyEventMap {
    'user:login': { userId: string; timestamp: number };
    'user:logout': { userId: string; timestamp: number };
    'data:update': { id: string; data: any };
}
```
通过接口定义类型安全的事件映射。

### 4.2 基本使用流程
```typescript
const eventBus = new EventBus<MyEventMap>();

// 注册中间件
eventBus.use(loggerMiddleware);

// 注册事件处理器
eventBus.on('user:login', async (payload) => {
    console.log(`[HIGH] User ${payload.userId} logged in`);
}, Priority.HIGH);

// 触发事件
await eventBus.emit('user:login', {
    userId: 'user123',
    timestamp: Date.now()
});
```

## 5. 技术要点

### 5.1 类型安全
- 使用泛型约束确保事件名称和数据类型的匹配
- 通过 TypeScript 的类型系统实现编译时类型检查

### 5.2 优先级机制
- 通过优先级枚举定义处理顺序
- 订阅者列表按优先级排序
- 高优先级处理器先执行

### 5.3 中间件系统
- 采用洋葱模型设计
- 支持异步处理
- 可以修改事件数据
- 提供统一的错误处理机制

### 5.4 一次性订阅
- 通过 once 标记实现
- 在处理完成后自动清理
- 支持优先级设置

## 6. 最佳实践

1. 事件命名
   - 使用 `namespace:action` 格式
   - 清晰表达事件含义

2. 类型定义
   - 为所有事件定义明确的数据类型
   - 避免使用 any 类型

3. 错误处理
   - 使用错误处理中间件捕获异常
   - 在事件处理器中妥善处理异常

4. 性能考虑
   - 合理使用优先级机制
   - 及时清理不需要的订阅
   - 避免过多的中间件
