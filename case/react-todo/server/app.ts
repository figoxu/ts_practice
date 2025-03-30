import express from 'express';
import cors from 'cors';
import { json } from 'body-parser';
import { todoRouter } from './routes/todo.js';

const app = express();

// 中间件
app.use(cors());
app.use(json());

// 路由
app.use('/api/todos', todoRouter);

export { app }; 