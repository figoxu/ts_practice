import { z } from 'zod';

// 配置变更事件类型
type ConfigChangeEvent = {
    path: string[];
    oldValue: any;
    newValue: any;
    timestamp: number;
};

// 配置观察者接口
interface ConfigObserver {
    onConfigChange(event: ConfigChangeEvent): void;
}

// 版本控制接口
interface VersionedConfig {
    version: number;
    data: any;
    timestamp: number;
}

// Zod schemas
const baseConfigSchema = z.object({
    name: z.string(),
    version: z.string(),
    enabled: z.boolean()
});

const databaseConfigSchema = z.object({
    ...baseConfigSchema.shape,
    host: z.string().default('localhost'),
    port: z.number().int().min(1).max(65535).default(5432),
    username: z.string(),
    password: z.string(),
    poolSize: z.number().int().positive().optional().default(10)
});

const loggingConfigSchema = z.object({
    level: z.enum(['debug', 'info', 'warn', 'error']).default('info'),
    path: z.string().default('./logs')
});

const appConfigSchema = z.object({
    env: z.enum(['development', 'production', 'test']).default('development'),
    database: databaseConfigSchema,
    logging: loggingConfigSchema
}).passthrough();

// TypeScript 类型定义
export type DatabaseConfig = z.infer<typeof databaseConfigSchema>;
export type AppConfig = z.infer<typeof appConfigSchema>;
export type { ConfigChangeEvent, ConfigObserver, VersionedConfig };

export class EnhancedConfigManager {
    private config: AppConfig;
    private observers: Set<ConfigObserver> = new Set();
    private history: VersionedConfig[] = [];
    private version: number = 0;

    constructor(initialConfig: Partial<AppConfig>) {
        // 使用 Zod 的默认值处理
        this.config = appConfigSchema.parse(initialConfig);
        this.saveVersion();
    }

    // 注册配置观察者
    public subscribe(observer: ConfigObserver): () => void {
        this.observers.add(observer);
        return () => this.observers.delete(observer);
    }

    // 通知所有观察者
    private notifyObservers(path: string[], oldValue: any, newValue: any) {
        const event: ConfigChangeEvent = {
            path,
            oldValue,
            newValue,
            timestamp: Date.now()
        };
        this.observers.forEach(observer => observer.onConfigChange(event));
    }

    // 获取完整配置
    public getConfig(): Readonly<AppConfig> {
        return Object.freeze({...this.config});
    }

    // 更新配置
    public update<T extends keyof AppConfig>(key: T, value: AppConfig[T]): void {
        const oldValue = this.config[key];
        // 根据键名获取对应的 schema 并验证
        if (key === 'database') {
            databaseConfigSchema.parse(value);
        } else if (key === 'logging') {
            loggingConfigSchema.parse(value);
        } else if (key === 'env') {
            appConfigSchema.shape.env.parse(value);
        }
        this.config[key] = value;
        this.notifyObservers([String(key)], oldValue, value);
        this.saveVersion();
    }

    // 保存当前版本
    private saveVersion(): void {
        this.version++;
        this.history.push({
            version: this.version,
            data: {...this.config},
            timestamp: Date.now()
        });
    }

    // 获取特定版本的配置
    public getVersion(version: number): VersionedConfig | undefined {
        return this.history.find(h => h.version === version);
    }

    // 比较两个版本的配置差异
    public compareVersions(v1: number, v2: number): Record<string, {old: any, new: any}> {
        const config1 = this.getVersion(v1)?.data;
        const config2 = this.getVersion(v2)?.data;
        
        if (!config1 || !config2) {
            throw new Error('Invalid version numbers');
        }

        return this.findDifferences(config1, config2);
    }

    // 递归比较对象差异
    private findDifferences(obj1: any, obj2: any, path: string = ''): Record<string, {old: any, new: any}> {
        const differences: Record<string, {old: any, new: any}> = {};

        const keys = new Set([...Object.keys(obj1), ...Object.keys(obj2)]);

        for (const key of keys) {
            const currentPath = path ? `${path}.${key}` : key;
            
            if (typeof obj1[key] === 'object' && typeof obj2[key] === 'object') {
                const nestedDiff = this.findDifferences(obj1[key], obj2[key], currentPath);
                Object.assign(differences, nestedDiff);
            } else if (obj1[key] !== obj2[key]) {
                differences[currentPath] = {
                    old: obj1[key],
                    new: obj2[key]
                };
            }
        }

        return differences;
    }
}

// 创建默认配置实例
const defaultConfig: Partial<AppConfig> = {
    env: 'development',
    database: {
        name: 'myapp',
        version: '1.0.0',
        enabled: true,
        host: 'localhost',
        port: 5432,
        username: 'admin',
        password: 'admin123',
        poolSize: 10
    },
    logging: {
        level: 'info',
        path: './logs'
    }
};

// 导出配置管理器实例
export const configManager = new EnhancedConfigManager(defaultConfig); 