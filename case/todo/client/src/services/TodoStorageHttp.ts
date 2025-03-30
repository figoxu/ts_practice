import { Todo } from '../../../shared/src/types';
import { TodoStorage } from './TodoStorage';

export class TodoStorageHttp implements TodoStorage {
  private readonly apiUrl: string;

  constructor(baseUrl: string = 'http://localhost:3001/api/todos') {
    this.apiUrl = baseUrl;
  }

  async getAll(): Promise<Todo[]> {
    const response = await fetch(this.apiUrl);
    return response.json();
  }

  async add(todo: Omit<Todo, 'id'>): Promise<Todo> {
    const response = await fetch(this.apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(todo),
    });
    return response.json();
  }

  async update(todo: Todo): Promise<Todo> {
    const response = await fetch(`${this.apiUrl}/${todo.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(todo),
    });
    return response.json();
  }

  async delete(id: string): Promise<void> {
    await fetch(`${this.apiUrl}/${id}`, {
      method: 'DELETE',
    });
  }

  async toggle(id: string): Promise<Todo> {
    const response = await fetch(`${this.apiUrl}/${id}/toggle`, {
      method: 'PUT',
    });
    return response.json();
  }
} 