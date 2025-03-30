import { Router } from 'express';
import { Todo } from '@todo/shared';

const todoRouter = Router();

// 内存中存储todos
let todos: Todo[] = [];
let nextId = 1;

// 获取所有todos
todoRouter.get('/', async (req, res) => {
  res.json(todos);
});

// 添加todo
todoRouter.post('/', async (req, res) => {
  const { title } = req.body;
  const newTodo: Todo = {
    id: nextId++,
    title,
    completed: false
  };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// 删除todo
todoRouter.delete('/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  todos = todos.filter(todo => todo.id !== id);
  res.status(204).send();
});

// 切换todo状态
todoRouter.put('/:id/toggle', async (req, res) => {
  const id = parseInt(req.params.id);
  const todo = todos.find(t => t.id === id);
  if (todo) {
    todo.completed = !todo.completed;
    res.json(todo);
  } else {
    res.status(404).json({ message: 'Todo not found' });
  }
});

export { todoRouter }; 