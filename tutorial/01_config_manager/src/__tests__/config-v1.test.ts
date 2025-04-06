import { EnhancedConfigManager } from '../config-v1';
import { describe, test, expect, jest, beforeEach } from '@jest/globals';

describe('EnhancedConfigManager', () => {
    let configManager: EnhancedConfigManager;

    beforeEach(() => {
        // 每个测试用例前初始化配置管理器
        configManager = new EnhancedConfigManager({
            env: 'development',
            database: {
                name: 'test-db',
                version: '1.0.0',
                enabled: true,
                host: 'localhost',
                port: 5432,
                username: 'test-user',
                password: 'test-pass',
                poolSize: 10
            },
            logging: {
                level: 'info',
                path: './logs'
            }
        });
    });

    // 测试初始化和默认值
    describe('初始化', () => {
        test('应该使用提供的配置正确初始化', () => {
            const config = configManager.getConfig();
            expect(config.env).toBe('development');
            expect(config.database.name).toBe('test-db');
            expect(config.database.port).toBe(5432);
        });

        test('应该应用默认值到未指定的字段', () => {
            const config = configManager.getConfig();
            expect(config.database.poolSize).toBe(10); // 默认值
            expect(config.logging.level).toBe('info'); // 默认值
            expect(config.logging.path).toBe('./logs'); // 默认值
        });
    });

    // 测试配置更新
    describe('配置更新', () => {
        test('应该正确更新配置值', () => {
            configManager.update('env', 'production');
            const config = configManager.getConfig();
            expect(config.env).toBe('production');
        });

        test('更新后的配置应该是只读的', () => {
            const config = configManager.getConfig();
            expect(() => {
                (config as any).env = 'production';
            }).toThrow();
        });
    });

    // 测试观察者模式
    describe('配置变更通知', () => {
        test('观察者应该收到配置变更通知', () => {
            const mockObserver = {
                onConfigChange: jest.fn()
            };

            configManager.subscribe(mockObserver);
            configManager.update('env', 'production');

            expect(mockObserver.onConfigChange).toHaveBeenCalledWith(
                expect.objectContaining({
                    path: ['env'],
                    oldValue: 'development',
                    newValue: 'production'
                })
            );
        });

        test('取消订阅后不应该收到通知', () => {
            const mockObserver = {
                onConfigChange: jest.fn()
            };

            const unsubscribe = configManager.subscribe(mockObserver);
            unsubscribe();
            configManager.update('env', 'production');

            expect(mockObserver.onConfigChange).not.toHaveBeenCalled();
        });
    });

    // 测试版本控制
    describe('版本控制', () => {
        test('每次更新应该创建新版本', () => {
            const initialVersion = configManager.getVersion(1);
            configManager.update('env', 'production');
            const newVersion = configManager.getVersion(2);

            expect(initialVersion).toBeDefined();
            expect(newVersion).toBeDefined();
            expect(initialVersion?.data.env).toBe('development');
            expect(newVersion?.data.env).toBe('production');
        });

        test('应该能够获取特定版本的配置', () => {
            configManager.update('env', 'production');
            configManager.update('env', 'test');

            const v1 = configManager.getVersion(1);
            const v2 = configManager.getVersion(2);
            const v3 = configManager.getVersion(3);

            expect(v1?.data.env).toBe('development');
            expect(v2?.data.env).toBe('production');
            expect(v3?.data.env).toBe('test');
        });
    });

    // 测试配置差异比较
    describe('配置差异比较', () => {
        test('应该正确比较两个版本的差异', () => {
            // 初始版本
            const initialConfig = configManager.getConfig();

            // 更新配置
            configManager.update('env', 'production');
            configManager.update('database', {
                ...initialConfig.database,
                port: 5433
            });

            // 比较版本 1 和 3
            const differences = configManager.compareVersions(1, 3);

            expect(differences).toEqual({
                'env': {
                    old: 'development',
                    new: 'production'
                },
                'database.port': {
                    old: 5432,
                    new: 5433
                }
            });
        });

        test('比较不存在的版本应该抛出错误', () => {
            expect(() => {
                configManager.compareVersions(1, 999);
            }).toThrow('Invalid version numbers');
        });
    });

    // 测试错误处理
    describe('错误处理', () => {
        test('使用无效的环境值应该抛出错误', () => {
            expect(() => {
                configManager.update('env', 'invalid' as any);
            }).toThrow();
        });

        test('使用无效的端口号应该抛出错误', () => {
            expect(() => {
                configManager.update('database', {
                    ...configManager.getConfig().database,
                    port: 0
                });
            }).toThrow();
        });
    });
}); 