import { EventBus } from './event-bus.core';
import { Priority } from './event-bus.types';
import { loggerMiddleware, errorHandlerMiddleware, tracingMiddleware } from './event-bus.middleware';

// 定义事件类型
interface MyEventMap {
    'user:login': { userId: string; timestamp: number };
    'user:logout': { userId: string; timestamp: number };
    'data:update': { id: string; data: any };
}

// 创建事件总线实例
const eventBus = new EventBus<MyEventMap>();

// 注册中间件
eventBus.use(loggerMiddleware);
eventBus.use(errorHandlerMiddleware);
eventBus.use(tracingMiddleware);

// 注册高优先级处理器
eventBus.on('user:login', async (payload) => {
    console.log(`[HIGH] User ${payload.userId} logged in at ${payload.timestamp}`);
}, Priority.HIGH);

// 注册普通优先级处理器
eventBus.on('user:login', async (payload) => {
    console.log(`[NORMAL] Updating user status for ${payload.userId}`);
}, Priority.NORMAL);

// 注册一次性事件处理器
eventBus.once('user:logout', async (payload) => {
    console.log(`User ${payload.userId} logged out at ${payload.timestamp}`);
});

// 使用示例
async function demo() {
    try {
        // 触发登录事件
        await eventBus.emit('user:login', {
            userId: 'user123',
            timestamp: Date.now()
        });

        // 触发登出事件
        await eventBus.emit('user:logout', {
            userId: 'user123',
            timestamp: Date.now()
        });

        // 再次触发登出事件（一次性处理器不会再次执行）
        await eventBus.emit('user:logout', {
            userId: 'user123',
            timestamp: Date.now()
        });

    } catch (error) {
        console.error('Demo error:', error);
    }
}

// 运行演示
demo(); 