import { EventBus } from '../event-bus.core';
import { Priority } from '../event-bus.types';
import { loggerMiddleware, errorHandlerMiddleware } from '../event-bus.middleware';

// 模拟控制台输出
let consoleOutput: string[] = [];
const originalConsoleLog = console.log;
const originalConsoleError = console.error;

beforeEach(() => {
    consoleOutput = [];
    console.log = jest.fn((...args) => {
        consoleOutput.push(args.join(' '));
    });
    console.error = jest.fn((...args) => {
        consoleOutput.push(args.join(' '));
    });
});

afterEach(() => {
    console.log = originalConsoleLog;
    console.error = originalConsoleError;
});

describe('EventBus', () => {
    interface TestEventMap {
        'user:login': { userId: string; timestamp: number };
        'user:logout': { userId: string; timestamp: number };
        'data:update': { id: string; data: any };
    }

    let eventBus: EventBus<TestEventMap>;

    beforeEach(() => {
        eventBus = new EventBus<TestEventMap>();
    });

    describe('基本功能测试', () => {
        test('应该能够注册和触发事件', async () => {
            const handler = jest.fn();
            eventBus.on('user:login', handler);
            
            const payload = { userId: 'test123', timestamp: Date.now() };
            await eventBus.emit('user:login', payload);
            
            expect(handler).toHaveBeenCalledWith(payload);
            expect(handler).toHaveBeenCalledTimes(1);
        });

        test('应该能够注册一次性事件', async () => {
            const handler = jest.fn();
            eventBus.once('user:logout', handler);
            
            const payload = { userId: 'test123', timestamp: Date.now() };
            await eventBus.emit('user:logout', payload);
            await eventBus.emit('user:logout', payload);
            
            expect(handler).toHaveBeenCalledTimes(1);
        });

        test('应该能够注销事件处理器', async () => {
            const handler = jest.fn();
            eventBus.on('user:login', handler);
            
            const payload = { userId: 'test123', timestamp: Date.now() };
            await eventBus.emit('user:login', payload);
            
            eventBus.off('user:login', handler);
            await eventBus.emit('user:login', payload);
            
            expect(handler).toHaveBeenCalledTimes(1);
        });
    });

    describe('优先级测试', () => {
        test('应该按优先级顺序执行处理器', async () => {
            const executionOrder: string[] = [];
            
            eventBus.on('user:login', () => {
                executionOrder.push('normal');
            }, Priority.NORMAL);
            
            eventBus.on('user:login', () => {
                executionOrder.push('high');
            }, Priority.HIGH);
            
            eventBus.on('user:login', () => {
                executionOrder.push('low');
            }, Priority.LOW);
            
            await eventBus.emit('user:login', { userId: 'test123', timestamp: Date.now() });
            
            expect(executionOrder).toEqual(['high', 'normal', 'low']);
        });
    });

    describe('中间件测试', () => {
        test('应该正确执行中间件链', async () => {
            const executionOrder: string[] = [];
            
            const testMiddleware1: typeof loggerMiddleware = async (payload, next) => {
                executionOrder.push('middleware1 start');
                await next(payload);
                executionOrder.push('middleware1 end');
            };
            
            const testMiddleware2: typeof loggerMiddleware = async (payload, next) => {
                executionOrder.push('middleware2 start');
                await next(payload);
                executionOrder.push('middleware2 end');
            };
            
            eventBus.use(testMiddleware1);
            eventBus.use(testMiddleware2);
            
            const handler = () => {
                executionOrder.push('handler');
            };
            
            eventBus.on('user:login', handler);
            
            await eventBus.emit('user:login', { userId: 'test123', timestamp: Date.now() });
            
            expect(executionOrder).toEqual([
                'middleware1 start',
                'middleware2 start',
                'handler',
                'middleware2 end',
                'middleware1 end'
            ]);
        });

        test('中间件应该能够修改事件数据', async () => {
            const modifyingMiddleware: typeof loggerMiddleware = async (payload: any, next) => {
                await next({
                    ...payload,
                    modified: true
                });
            };
            
            eventBus.use(modifyingMiddleware);
            
            const handler = jest.fn();
            eventBus.on('user:login', handler);
            
            const payload = { userId: 'test123', timestamp: Date.now() };
            await eventBus.emit('user:login', payload);
            
            expect(handler).toHaveBeenCalledWith({
                ...payload,
                modified: true
            });
        });
    });

    describe('错误处理测试', () => {
        test('应该捕获并传播错误', async () => {
            const error = new Error('Test error');
            const handler = jest.fn(() => {
                throw error;
            });
            
            eventBus.use(errorHandlerMiddleware);
            eventBus.on('user:login', handler);
            
            await expect(eventBus.emit('user:login', { 
                userId: 'test123', 
                timestamp: Date.now() 
            })).rejects.toThrow(error);
            
            expect(consoleOutput).toContain('[Event Error] Error: Test error');
        });
    });
}); 