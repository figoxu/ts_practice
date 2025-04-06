import { configManager } from '../config';

describe('ConfigManager', () => {
    // 在每个测试用例前重置配置
    beforeEach(() => {
        // 由于我们的 configManager 是单例，这里我们需要重置它的状态
        configManager.updateDatabaseConfig({
            name: 'myapp',
            version: '1.0.0',
            enabled: true,
            host: 'localhost',
            port: 5432,
            username: 'admin',
            password: 'admin123'
        });
    });

    describe('基础配置测试', () => {
        test('应该能够获取基本配置', () => {
            const config = configManager.getConfig();
            expect(config.env).toBe('development');
            expect(config.database).toBeDefined();
        });

        test('配置应该是只读的', () => {
            const config = configManager.getConfig();
            expect(() => {
                (config as any).env = 'production';
            }).toThrow();
        });
    });

    describe('数据库配置测试', () => {
        test('应该能够获取数据库配置', () => {
            const dbConfig = configManager.getDatabaseConfig();
            expect(dbConfig.host).toBe('localhost');
            expect(dbConfig.port).toBe(5432);
            expect(dbConfig.username).toBe('admin');
        });

        test('应该能够更新部分数据库配置', () => {
            configManager.updateDatabaseConfig({
                port: 5433,
                poolSize: 10
            });

            const updatedConfig = configManager.getDatabaseConfig();
            expect(updatedConfig.port).toBe(5433);
            expect(updatedConfig.poolSize).toBe(10);
            // 确保其他配置保持不变
            expect(updatedConfig.host).toBe('localhost');
        });

        test('数据库配置应该是只读的', () => {
            const dbConfig = configManager.getDatabaseConfig();
            expect(() => {
                (dbConfig as any).port = 5434;
            }).toThrow();
        });
    });

    describe('可选配置测试', () => {
        test('未设置的可选配置应该返回 undefined', () => {
            const config = configManager.getConfig();
            expect(config.logging).toBeUndefined();
        });

        test('数据库的可选配置 poolSize 应该可以被设置', () => {
            configManager.updateDatabaseConfig({
                poolSize: 5
            });

            const dbConfig = configManager.getDatabaseConfig();
            expect(dbConfig.poolSize).toBe(5);
        });
    });

    describe('类型安全测试', () => {
        test('不应该接受错误类型的配置更新', () => {
            // TypeScript 编译时会报错，这里测试运行时行为
            expect(() => {
                configManager.updateDatabaseConfig({
                    port: '5433' as any // 故意传入错误类型
                });
            }).toThrow();
        });

        test('不应该接受未定义的配置项', () => {
            expect(() => {
                // 使用类型断言创建一个包含未知属性的对象
                const invalidConfig = { invalidKey: 'value' };
                configManager.updateDatabaseConfig(invalidConfig as any);
            }).toThrow();
        });
    });

    describe('环境配置测试', () => {
        test('环境配置应该是有效的枚举值', () => {
            const config = configManager.getConfig();
            expect(['development', 'production', 'test']).toContain(config.env);
        });
    });
}); 