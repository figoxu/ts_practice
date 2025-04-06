// 定义基础配置接口
interface BaseConfig {
    readonly appName: string;
    readonly version: string;
    readonly debug?: boolean;
}

// 定义数据库配置接口
interface DatabaseConfig {
    host: string;
    port: number;
    username: string;
    password: string;
}

// 定义完整配置接口
interface AppConfig extends BaseConfig {
    database: DatabaseConfig;
    features: {
        [key: string]: boolean;
    };
    limits: {
        maxUsers: number;
        maxRequests: number;
    };
}

// 配置管理器类
export class ConfigManager<T extends BaseConfig> {
    private config: T;
    private readonly readonlyKeys: (keyof BaseConfig)[] = ['appName', 'version'];

    constructor(initialConfig: T) {
        this.config = { ...initialConfig };
    }

    // 获取完整配置
    public getConfig(): Readonly<T> {
        return Object.freeze({ ...this.config });
    }

    // 获取特定配置项
    public get<K extends keyof T>(key: K): T[K] {
        return this.config[key];
    }

    // 更新配置（仅允许更新非只读字段）
    public update<K extends keyof T>(key: K, value: T[K]): void {
        if (this.readonlyKeys.includes(key as keyof BaseConfig)) {
            throw new Error(`Cannot update readonly property: ${String(key)}`);
        }
        this.config[key] = value;
    }

    // 合并配置
    public merge(newConfig: Partial<T>): void {
        this.config = {
            ...this.config,
            ...newConfig
        };
    }

    // 验证配置是否完整
    public validate(config: Partial<T> = this.config): boolean {
        const requiredKeys: (keyof BaseConfig)[] = ['appName', 'version'];
        return requiredKeys.every(key => key in config);
    }
}

// 导出接口供外部使用
export type { BaseConfig, DatabaseConfig, AppConfig }; 