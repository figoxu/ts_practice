import { TodoItem, TodoStorage } from './TodoStorage';

export class TodoStorageLocal implements TodoStorage {
  private todos: TodoItem[] = [];

  async getAll(): Promise<TodoItem[]> {
    return [...this.todos];
  }

  async add(text: string): Promise<TodoItem> {
    const newTodo: TodoItem = {
      id: Date.now(),
      text: text.trim(),
      completed: false,
    };
    this.todos.push(newTodo);
    return newTodo;
  }

  async delete(id: number): Promise<void> {
    this.todos = this.todos.filter(todo => todo.id !== id);
  }

  async toggle(id: number): Promise<void> {
    this.todos = this.todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
  }
} 