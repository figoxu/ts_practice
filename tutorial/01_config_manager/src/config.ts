// 1. 基础配置接口
import { z } from 'zod';

// Zod schemas
const baseConfigSchema = z.object({
    name: z.string(),
    version: z.string(),
    enabled: z.boolean()
});

const databaseConfigSchema = baseConfigSchema.extend({
    host: z.string(),
    port: z.number().int().min(1).max(65535),
    username: z.string(),
    password: z.string(),
    poolSize: z.number().int().positive().optional()
});

const loggingConfigSchema = z.object({
    level: z.enum(['debug', 'info', 'warn', 'error']),
    path: z.string()
}).optional();

const appConfigSchema = z.object({
    env: z.enum(['development', 'production', 'test']),
    database: databaseConfigSchema,
    logging: loggingConfigSchema
}).passthrough();  // 允许额外的字段

// TypeScript 类型定义
interface DatabaseConfig extends z.infer<typeof databaseConfigSchema> {}
interface AppConfig extends z.infer<typeof appConfigSchema> {}

// 类型验证函数
function validateDatabaseConfig(config: Partial<DatabaseConfig>) {
    // 使用 partial() 使所有字段变为可选
    return databaseConfigSchema.partial().parse(config);
}

// 配置管理器类
class ConfigManager {
    private config: AppConfig;

    constructor(initialConfig: AppConfig) {
        this.config = initialConfig;
    }

    // 获取完整配置
    getConfig(): Readonly<AppConfig> {
        return Object.freeze({...this.config});
    }

    // 获取数据库配置
    getDatabaseConfig(): Readonly<DatabaseConfig> {
        return Object.freeze({...this.config.database});
    }

    // 更新数据库配置
    updateDatabaseConfig(dbConfig: Partial<DatabaseConfig>) {
        validateDatabaseConfig(dbConfig);
        this.config.database = {
            ...this.config.database,
            ...dbConfig
        };
    }
}

// 使用示例
const defaultConfig: AppConfig = {
    env: 'development',
    database: {
        name: 'myapp',
        version: '1.0.0',
        enabled: true,
        host: 'localhost',
        port: 5432,
        username: 'admin',
        password: 'admin123'
    }
};

// 导出配置管理器实例
export const configManager = new ConfigManager(defaultConfig); 