import { Todo } from '../../../shared/src/types';
import { TodoStorage } from './TodoStorage';

export class TodoStorageLocal implements TodoStorage {
  private readonly storageKey = 'todos';

  async getAll(): Promise<Todo[]> {
    const todos = localStorage.getItem(this.storageKey);
    return todos ? JSON.parse(todos) : [];
  }

  async add(todo: Omit<Todo, 'id'>): Promise<Todo> {
    const todos = await this.getAll();
    const newTodo: Todo = {
      ...todo,
      id: Date.now().toString()
    };
    todos.push(newTodo);
    localStorage.setItem(this.storageKey, JSON.stringify(todos));
    return newTodo;
  }

  async update(todo: Todo): Promise<Todo> {
    const todos = await this.getAll();
    const index = todos.findIndex(t => t.id === todo.id);
    if (index === -1) {
      throw new Error('Todo not found');
    }
    todos[index] = todo;
    localStorage.setItem(this.storageKey, JSON.stringify(todos));
    return todo;
  }

  async delete(id: string): Promise<void> {
    const todos = await this.getAll();
    const filteredTodos = todos.filter(todo => todo.id !== id);
    localStorage.setItem(this.storageKey, JSON.stringify(filteredTodos));
  }

  async toggle(id: string): Promise<Todo> {
    const todos = await this.getAll();
    const todo = todos.find(t => t.id === id);
    if (!todo) {
      throw new Error('Todo not found');
    }
    todo.completed = !todo.completed;
    await this.update(todo);
    return todo;
  }
} 