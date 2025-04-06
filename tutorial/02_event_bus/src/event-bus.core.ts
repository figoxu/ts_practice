import {
    EventHandler,
    Priority,
    Subscriber,
    Middleware,
    EventMap,
    IEventBus
} from './event-bus.types';

export class EventBus<T extends EventMap> implements IEventBus<T> {
    private subscribers: Map<keyof T, Subscriber<any>[]> = new Map();
    private middlewares: Middleware[] = [];

    // 注册事件处理器
    on<K extends keyof T>(
        event: K,
        handler: EventHandler<T[K]>,
        priority: Priority = Priority.NORMAL
    ): void {
        if (!this.subscribers.has(event)) {
            this.subscribers.set(event, []);
        }
        
        const subscriber: Subscriber<T[K]> = {
            handler,
            priority,            once: false
        };
        
        const subscribers = this.subscribers.get(event)!;
        subscribers.push(subscriber);
        subscribers.sort((a, b) => b.priority - a.priority);
    }

    // 注册一次性事件处理器
    once<K extends keyof T>(
        event: K,
        handler: EventHandler<T[K]>,
        priority: Priority = Priority.NORMAL
    ): void {
        if (!this.subscribers.has(event)) {
            this.subscribers.set(event, []);
        }
        
        const subscriber: Subscriber<T[K]> = {
            handler,
            priority,
            once: true
        };
        
        const subscribers = this.subscribers.get(event)!;
        subscribers.push(subscriber);
        subscribers.sort((a, b) => b.priority - a.priority);
    }

    // 注销事件处理器
    off<K extends keyof T>(event: K, handler: EventHandler<T[K]>): void {
        if (!this.subscribers.has(event)) return;
        
        const subscribers = this.subscribers.get(event)!;
        const index = subscribers.findIndex(sub => sub.handler === handler);
        if (index !== -1) {
            subscribers.splice(index, 1);
        }
    }

    // 触发事件
    async emit<K extends keyof T>(event: K, payload: T[K]): Promise<void> {
        if (!this.subscribers.has(event)) return;

        // 构建中间件链
        const compose = (middlewares: Middleware[]): Middleware => {
            return async (payload: any, next: (payload: any) => Promise<void>) => {
                const dispatch = async (index: number, currentPayload: any): Promise<void> => {
                    if (index === middlewares.length) {
                        return next(currentPayload);
                    }
                    const middleware = middlewares[index];
                    if (!middleware) {
                        return next(currentPayload);
                    }
                    return middleware(currentPayload, (nextPayload) => dispatch(index + 1, nextPayload));
                };
                return dispatch(0, payload);
            };
        };

        // 执行中间件链
        const chain = compose(this.middlewares);
        await chain(payload, async (processedPayload) => {
            const subscribers = [...(this.subscribers.get(event) || [])];
            
            for (const subscriber of subscribers) {
                await subscriber.handler(processedPayload);
                
                if (subscriber.once) {
                    this.off(event, subscriber.handler);
                }
            }
        });
    }

    // 注册中间件
    use(middleware: Middleware): void {
        this.middlewares.push(middleware);
    }
} 