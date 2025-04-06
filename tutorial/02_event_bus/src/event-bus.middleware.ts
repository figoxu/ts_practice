import { Middleware } from './event-bus.types';

// 日志中间件
export const loggerMiddleware: Middleware = async (payload, next) => {
    console.log(`[Event] Payload:`, payload);
    const startTime = Date.now();
    await next(payload);
    const endTime = Date.now();
    console.log(`[Event] Completed in ${endTime - startTime}ms`);
};

// 错误处理中间件
export const errorHandlerMiddleware: Middleware = async (payload, next) => {
    try {
        await next(payload);
    } catch (error) {
        console.error('[Event Error]', error);
        throw error;
    }
};

// 事件追踪中间件
export const tracingMiddleware: Middleware = async (payload, next) => {
    const traceId = Math.random().toString(36).substring(7);
    console.log(`[Trace: ${traceId}] Event started`);
    await next({
        ...payload,
        _traceId: traceId
    });
    console.log(`[Trace: ${traceId}] Event ended`);
}; 