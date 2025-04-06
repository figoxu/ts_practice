// 事件处理器函数类型
export type EventHandler<T = any> = (payload: T) => void | Promise<void>;

// 事件优先级枚举
export enum Priority {
    LOW = 0,
    NORMAL = 1,
    HIGH = 2,
}

// 事件订阅者接口
export interface Subscriber<T = any> {
    handler: EventHandler<T>;
    priority: Priority;
    once?: boolean;
}

// 事件过滤器类型
export type EventFilter<T = any> = (payload: T) => boolean;

// 中间件类型
export type Middleware<T = any> = (
    payload: T,
    next: (payload: T) => Promise<void>
) => Promise<void>;

// 事件映射接口
export interface EventMap {
    [eventName: string]: any;
}

// 类型安全的事件总线接口
export interface IEventBus<T extends EventMap> {
    /**
     * 注册一个事件监听器
     * @param event 事件名称
     * @param handler 事件处理函数
     * @param priority 事件处理优先级，默认为 NORMAL
     */
    on<K extends keyof T>(event: K, handler: EventHandler<T[K]>, priority?: Priority): void;

    /**
     * 注册一个一次性事件监听器，触发一次后自动移除
     * @param event 事件名称
     * @param handler 事件处理函数
     * @param priority 事件处理优先级，默认为 NORMAL
     */
    once<K extends keyof T>(event: K, handler: EventHandler<T[K]>, priority?: Priority): void;

    /**
     * 移除指定的事件监听器
     * @param event 事件名称
     * @param handler 要移除的事件处理函数
     */
    off<K extends keyof T>(event: K, handler: EventHandler<T[K]>): void;

    /**
     * 触发指定事件
     * @param event 事件名称
     * @param payload 事件数据
     * @returns Promise<void> 所有事件处理器执行完成的 Promise
     */
    emit<K extends keyof T>(event: K, payload: T[K]): Promise<void>;

    /**
     * 添加中间件
     * @param middleware 中间件函数，用于在事件处理前后执行额外逻辑
     */
    use(middleware: Middleware): void;
} 