# React 基础 & 开发环境搭建

## 1. React 核心概念

### 什么是 React？
React 是由 Facebook 开发的开源 JavaScript 库，用于构建用户界面。它主要有以下特点：

- **组件化开发**：将 UI 拆分成独立、可复用的组件
- **虚拟 DOM**：通过虚拟 DOM 提高渲染性能
- **单向数据流**：使应用中的数据流动更可预测
- **声明式编程**：让代码更易于理解和维护

### 为什么选择 React？
- 学习曲线平缓
- 社区活跃，生态丰富
- 性能优秀
- 跨平台支持（Web、移动端）

## 2. 开发环境搭建

### 必备工具
1. **Node.js**：
   ```bash
   # 检查是否安装
   node -v
   npm -v
   ```

2. **代码编辑器**：
   - VS Code（推荐）
   - 建议安装的 VS Code 插件：
     - ESLint
     - Prettier
     - ES7+ React/Redux/React-Native snippets

### 创建 React 项目

使用 Create React App 创建项目：

```bash
# 创建新项目
npx create-react-app todo-app --template typescript

# 进入项目目录
cd todo-app

# 启动开发服务器
npm start
```

## 3. JSX 语法入门

JSX 是 JavaScript 的语法扩展，允许在 JavaScript 中编写类似 HTML 的代码。

### JSX 基础规则
- JSX 元素必须有一个父容器
- 所有标签必须闭合
- 使用 `className` 而不是 `class`
- JavaScript 表达式需要用 `{}` 包裹

示例：
```jsx
function Welcome() {
  const name = "React";
  return (
    <div className="welcome">
      <h1>Hello, {name}!</h1>
      <p>Welcome to React world!</p>
    </div>
  );
}
```

## 4. 项目结构

典型的 React 项目结构：

```
todo-app/
├── node_modules/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── components/
│   ├── App.tsx
│   ├── index.tsx
│   └── index.css
├── package.json
└── tsconfig.json
```

### 主要文件说明
- `public/index.html`：应用的 HTML 模板
- `src/index.tsx`：应用的入口文件
- `src/App.tsx`：根组件
- `src/components/`：存放组件文件
- `package.json`：项目配置和依赖管理
- `tsconfig.json`：TypeScript 配置文件

## 5. 实践练习

1. 创建新的 React 项目
2. 修改 `App.tsx`，创建一个简单的欢迎页面
3. 尝试使用不同的 JSX 语法特性
4. 熟悉项目结构和文件作用

## 下一步
完成本章学习后，你应该能够：
- 理解 React 的基本概念
- 搭建 React 开发环境
- 使用基础的 JSX 语法
- 了解 React 项目结构

准备好后，我们将在下一章开始学习 React 组件的创建和使用。 