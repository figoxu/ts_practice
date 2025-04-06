import { ConfigManager, AppConfig } from '../config-v0';

describe('ConfigManager', () => {
    let configManager: ConfigManager<AppConfig>;
    const initialConfig: AppConfig = {
        appName: 'TestApp',
        version: '1.0.0',
        debug: true,
        database: {
            host: 'localhost',
            port: 5432,
            username: 'admin',
            password: 'password123'
        },
        features: {
            darkMode: true,
            notifications: false
        },
        limits: {
            maxUsers: 1000,
            maxRequests: 10000
        }
    };

    beforeEach(() => {
        configManager = new ConfigManager<AppConfig>(initialConfig);
    });

    test('应该正确初始化配置', () => {
        const config = configManager.getConfig();
        expect(config).toEqual(initialConfig);
    });

    test('应该能够获取特定配置项', () => {
        expect(configManager.get('appName')).toBe('TestApp');
        expect(configManager.get('database')).toEqual(initialConfig.database);
    });

    test('不应该允许修改只读属性', () => {
        expect(() => {
            configManager.update('appName', 'NewApp');
        }).toThrow('Cannot update readonly property: appName');
    });

    test('应该能够更新非只读属性', () => {
        const newDatabase = {
            host: 'newhost',
            port: 3306,
            username: 'newadmin',
            password: 'newpass'
        };
        configManager.update('database', newDatabase);
        expect(configManager.get('database')).toEqual(newDatabase);
    });

    test('应该能够合并新配置', () => {
        const newPartialConfig = {
            debug: false,
            limits: {
                maxUsers: 2000,
                maxRequests: 20000
            }
        };
        configManager.merge(newPartialConfig);
        const updatedConfig = configManager.getConfig();
        expect(updatedConfig.debug).toBe(false);
        expect(updatedConfig.limits).toEqual(newPartialConfig.limits);
    });

    test('应该正确验证配置', () => {
        expect(configManager.validate()).toBe(true);

        const invalidConfig = {
            version: '1.0.0'
            // 缺少必需的 appName
        };
        expect(configManager.validate(invalidConfig)).toBe(false);
    });

    test('返回的配置应该是只读的', () => {
        const config = configManager.getConfig();
        expect(() => {
            (config as any).appName = 'NewApp';
        }).toThrow();
    });
}); 