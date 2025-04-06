# NestJS 框架简介

## 什么是 NestJS？
NestJS 是一个用于构建高效、可扩展的 Node.js 服务器端应用程序的框架。它完全支持 TypeScript，并结合了 OOP（面向对象编程）、FP（函数式编程）的编程范式。

## 核心特性

### 1. 架构模式
- 控制器（Controllers）：处理请求
- 提供者（Providers）：处理业务逻辑
- 模块（Modules）：组织应用结构

### 2. 内置功能
- 依赖注入系统
- WebSocket 支持
- GraphQL 集成
- 微服务支持
- REST API
- 数据库集成（TypeORM）

### 3. 开发体验
- TypeScript 优先
- 装饰器语法
- 模块化设计
- CLI 工具支持

## 快速开始

```bash
# 安装 CLI
npm i -g @nestjs/cli

# 创建项目
nest new project-name
```

## 示例代码

```typescript
// 控制器示例
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    findAll(): Promise<User[]> {
        return this.usersService.findAll();
    }
}

// 服务示例
@Injectable()
export class UsersService {
    async findAll(): Promise<User[]> {
        return this.usersRepository.find();
    }
}

// 模块示例
@Module({
    controllers: [UsersController],
    providers: [UsersService],
})
export class UsersModule {}
```

## 资源链接
- GitHub: https://github.com/nestjs/nest
- 文档：https://docs.nestjs.com/
- 社区：https://discord.gg/nestjs

## 适用场景
1. 企业级应用开发
2. RESTful API 服务
3. 实时应用（WebSocket）
4. 微服务架构
5. GraphQL API 